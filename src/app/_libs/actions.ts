'use server';

import {
  validateAddressForm,
  validateLoginForm,
  validateSignupForm,
  validateUpdatePasswordForm,
  validateUpdateProfileForm,
} from '@helpers/validator';
import {
  login,
  signup,
  logout,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  updateProfile,
  updatePassword,
  addAddress,
  deleteAddress,
  updateAddress,
  setDefaultAddress,
  addOrUpdateCartItem,
  removeCartItem,
  checkToken,
  verifyDiscountCode,
  reauthenticate,
  createCheckoutSession,
} from '@libs/apiServices';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  UpdatePasswordInput,
  AddressSelectInput,
  SignupInput,
  UpdateProfileInput,
} from '../_types/validateInput';
import { transformAddressFormData } from '../_helpers/transformAddressFormData';
import { FormError } from '../_types/formError';

export async function loginAction(
  _: unknown,
  formData: FormData
): Promise<{
  success: boolean;
  inputData?: { email: string; password: string };
  errors?: FormError;
} | void> {
  const userInput = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validation = validateLoginForm(userInput);
  if (!validation.success) {
    return {
      success: false,
      inputData: userInput,
      errors: validation.errors,
    };
  }

  const loginData = await login(userInput);

  if (loginData.message)
    return {
      success: false,
      inputData: userInput,
      errors: {
        email: loginData.message,
      },
    };

  const cookiesStore = await cookies();
  const expiresAt = new Date(
    (Date.now() + Number(process.env.JWT_COOKIES_EXPIRES_IN!)) *
      24 *
      60 *
      60 *
      1000
  );
  cookiesStore.set('jwt', loginData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  cookiesStore.delete('reauthenticated');

  redirect('/account');
}

export async function signupAction(
  _: unknown,
  formData: FormData
): Promise<{
  success: boolean;
  inputData?: SignupInput;
  errors?: FormError;
} | void> {
  const input: SignupInput = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
    name: formData.get('name') as string,
    gender: formData.get('gender') as string,
    dob: formData.get('dob') as string,
    terms: formData.get('terms') === 'true',
  };

  console.log('formData', formData);

  const validation = await validateSignupForm(input);
  if (!validation.success) {
    return {
      success: false,
      inputData: input,
      errors: validation.errors,
    };
  }

  const signupData = await signup(input);

  if (signupData.message)
    return {
      success: false,
      inputData: input,
      errors: {
        message: signupData.message,
      },
    };

  const cookiesStore = await cookies();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  cookiesStore.set('jwt', signupData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  await sendOTPAction({ counter: 0 });

  redirect('/signup/verifyEmail');
}

export const sendOTPAction = async ({ counter }: { counter: number }) => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('jwt');

    if (!token) {
      throw new Error('No token found.');
    }

    const response = await sendOTP(token);
    if (response.status === 'success') {
      return { counter: counter + 1 };
    }

    throw new Error(response.message || 'Failed to send OTP.');
  } catch (error) {
    return {
      counter: counter,
      errors: {
        message: (error as Error).message || 'An unknown error occurred.',
      },
    };
  }
};

export async function verifyOTPAction(_: unknown, formData: FormData) {
  const { otp } = Object.fromEntries(formData);

  if (!otp) {
    return {
      errors: {
        otp: 'OTP is required',
      },
    };
  }

  // Verify OTP
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        otp: 'No token found. Please log in again.',
      },
    };
  }

  const data = await verifyOTP(otp as string, token);
  if (data.status !== 'success')
    return {
      errors: {
        otp: data.message,
      },
    };

  redirect('/account');
}

export async function logoutAction() {
  const data = await logout();

  if (data.status !== 'success')
    return {
      errors: {
        message: data.message,
      },
    };

  const cookiesStore = await cookies();
  cookiesStore.delete('jwt');
  cookiesStore.delete('reauthenticated');

  redirect('/');
}

export async function forgotPasswordAction(
  _: unknown,
  formData: FormData
): Promise<{ success: boolean; errors: FormError }> {
  const { email } = Object.fromEntries(formData);

  if (!email) {
    return {
      success: false,
      errors: {
        message: 'E-mail address is required',
      },
    };
  }

  try {
    const data = await forgotPassword(email as string);
    if (data.status === 'success') {
      return {
        success: true,
        errors: {},
      };
    } else throw new Error(data.message || 'Failed to send reset token.');
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
}

export async function resetPasswordAction(
  _: unknown,
  formData: FormData
): Promise<{
  success: boolean | undefined;
  errors: FormError;
}> {
  const { password, passwordConfirm, resetToken } =
    Object.fromEntries(formData);

  if (!password || !passwordConfirm) {
    return {
      success: false,
      errors: {
        password: 'Password and password confirm are required',
      },
    };
  }

  if (password !== passwordConfirm) {
    return {
      success: false,
      errors: {
        password: 'Password and password confirm do not match',
      },
    };
  }

  // Reset password
  try {
    const data = await resetPassword(
      {
        password: password as string,
        passwordConfirm: passwordConfirm as string,
      },
      resetToken as string
    );
    if (data.status === 'success') redirect('/account');
    else
      return {
        success: false,
        errors: { message: data.message || 'Failed to reset password.' },
      };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
}

export async function updateProfileAction(
  photo: File | undefined,
  _: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData) as UpdateProfileInput;
  data.photo = photo ?? data.photo;

  const validation = validateUpdateProfileForm(data);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      success: false,
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await updateProfile(data, token);
  if (response.status === 'success') {
    revalidatePath('/account');

    return {
      success: true,
    };
  } else
    return {
      success: false,
      errors: {
        message: response.message,
      },
    };
}

export async function updatePasswordAction(_: unknown, formData: FormData) {
  const input: UpdatePasswordInput = {
    passwordCurrent: formData.get('passwordCurrent') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
  };

  const validation = validateUpdatePasswordForm(input);

  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await updatePassword(input, token);
  if (response.status === 'success') {
    const cookiesStore = await cookies();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    cookiesStore.set('jwt', response.token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    cookiesStore.delete('reauthenticated');

    revalidatePath('/account');
    return {
      success: true,
    };
  } else {
    return {
      errors: {
        message: response.message,
      },
    };
  }
}

export async function addAddressAction(
  _: unknown,
  formData: FormData
): Promise<{ success: boolean; errors: FormError }> {
  const data = Object.fromEntries(formData) as AddressSelectInput;
  const addressData = transformAddressFormData(data);

  const validation = validateAddressForm(addressData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      success: false,
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await addAddress(data, token);
  if (response.status === 'success') {
    revalidatePath('/account/addresses');
    revalidatePath('/checkout');
    return {
      success: true,
      errors: {},
    };
  } else {
    return {
      success: false,
      errors: {
        message: response.message,
      },
    };
  }
}

export async function deleteAddressAction(addressId: string) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  try {
    await deleteAddress(addressId, token);
    revalidatePath('/account/addresses');
    return {
      success: true,
    };
  } catch (error) {
    return {
      errors: {
        message: (error as Error).message,
      },
    };
  }
}

export async function updateAddressAction(
  addressId: string,
  _: unknown,
  formData: FormData
): Promise<{ success: boolean; errors: FormError }> {
  const data = Object.fromEntries(formData) as AddressSelectInput;
  const addressData = transformAddressFormData(data);
  const validation = validateAddressForm(addressData);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      success: false,
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await updateAddress(addressId, data, token);
  if (response.status === 'success') {
    revalidatePath('/account/addresses');
    return {
      success: true,
      errors: {},
    };
  } else {
    return {
      success: false,
      errors: {
        message: response.message,
      },
    };
  }
}

export async function setDefaultAddressAction(addressId: string) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await setDefaultAddress(addressId, token);
  if (response.status === 'success') {
    revalidatePath('/account/addresses');
    return {
      success: true,
    };
  } else {
    return {
      errors: {
        message: response.message,
      },
    };
  }
}

export async function addOrUpdateCartItemAction(
  productId: string,
  variantId: string,
  quantity: number
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const { valid } = await checkToken(token);
  if (!valid) {
    return {
      errors: {
        user: 'Please login to continue',
      },
    };
  }

  const response = await addOrUpdateCartItem(
    productId,
    variantId,
    quantity,
    token
  );
  if (response.status === 'success') {
    revalidatePath('/cart');
    return {
      success: true,
    };
  } else {
    return {
      errors: {
        message: response.message,
      },
    };
  }
}

export async function removeCartItemAction(
  productId: string,
  variantId: string
) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await removeCartItem(productId, variantId, token);
  if (response.status === 'success') {
    revalidatePath('/cart');
    return {
      success: true,
    };
  } else {
    return {
      errors: {
        message: response.message,
      },
    };
  }
}

export async function verifyDiscountCodeAction(
  _: unknown,
  formData: FormData
): Promise<{
  success: boolean;
  code?: string;
  discountAmount?: number;
  errors: FormError;
}> {
  const code = formData.get('code') as string;

  if (!code) {
    return {
      success: false,
      errors: {
        code: 'Discount code is required',
      },
    };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      success: false,
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await verifyDiscountCode(code as string, token);
  if (response.data.isValid) {
    revalidatePath('/cart');

    return {
      success: true,
      code,
      discountAmount: response.data.discountAmount,
      errors: {},
    };
  } else {
    return {
      success: false,
      code,
      errors: {
        message: 'Your voucher is not valid or has expired',
      },
    };
  }
}

export async function reauthenticateAction(
  redirectUrl: string,
  _: unknown,
  formData: FormData
) {
  const data = Object.fromEntries(formData);

  if (!data.password) {
    return {
      errors: {
        password: 'Password is required',
      },
    };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await reauthenticate(data.password as string, token);

  if (response.status === 'success') {
    const expiresAt = new Date(
      Date.now() +
        1000 * Number(process.env.REAUTHENTICATED_COOKIES_EXPIRES_IN!)
    );
    cookiesStore.set('reauthenticated', 'true', {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
    redirect(redirectUrl);
  } else {
    return {
      errors: {
        password: response.message,
      },
    };
  }
}

export async function createCheckoutSessionAction() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      errors: {
        message: 'No token found. Please log in again.',
      },
    };
  }

  const response = await createCheckoutSession(token);
  if (response.status === 'success') {
    redirect(response.session.url);
  }
}
