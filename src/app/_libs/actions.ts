'use server';

import {
  validateAddressForm,
  validateCategoryForm,
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
  verifyDiscountCode,
  reauthenticate,
  createCheckoutSession,
  createOrder,
  cancelOrder,
  createReviewsByOrder,
  updateReviewsByOrder,
  getWishlist,
  getWishlistByShareCode,
  addProductToWishlist,
  removeProductFromWishlist,
  addMultipleItemsToCart,
  clearCartItems,
  getOrderByOrderCode,
  updateCategory,
  createCategory,
  addProduct,
  updateProduct,
  createShippingOrder,
  updateOrderStatus,
  refundOrder,
  deleteProduct,
} from '@libs/apiServices';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  UpdatePasswordInput,
  AddressSelectInput,
  SignupInput,
  UpdateProfileInput,
  ReviewInput,
  ReviewUpdateInput,
  CategoryInput,
  ProductInput,
} from '../_types/validateInput';
import { transformAddressFormData } from '../_helpers/transformAddressFormData';
import { FormError } from '../_types/formError';
import { Wishlist } from '../_types/wishlist';

async function checkLogin() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return {
      success: false,
      errors: {
        message: 'No token found. Please log in again.',
      } as FormError,
    };
  }

  return {
    success: true,
    token,
  };
}

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

  const {
    data: { user },
  } = loginData;

  const cookiesStore = await cookies();
  const expiresAt = new Date(
    Date.now() +
      Number(process.env.JWT_COOKIES_EXPIRES_IN!) * 24 * 60 * 60 * 1000
  );

  cookiesStore.set('jwt', loginData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  cookiesStore.set('verified', user.emailVerified, {
    httpOnly: true,
    secure: true,
  });
  cookiesStore.delete('reauthenticated');

  redirect(user.role !== 'admin' ? '/products' : '/admin/dashboard');
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
  const expiresAt = new Date(
    Date.now() +
      Number(process.env.JWT_COOKIES_EXPIRES_IN!) * 24 * 60 * 60 * 1000
  );
  cookiesStore.set('jwt', signupData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  await sendOTPAction({ counter: 0 });

  redirect('/signup/verifyEmail');
}

export const sendOTPAction = async ({
  counter,
}: {
  counter: number;
  success?: true;
}) => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('jwt');

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    const response = await sendOTP(token);
    if (response.status === 'success') {
      return { counter: counter + 1, success: true };
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
        message: 'OTP is required',
      },
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const data = await verifyOTP(otp as string, token);
  if (data.status !== 'success') {
    const cookiesStore = await cookies();
    cookiesStore.set('verified', 'true', {
      httpOnly: true,
      secure: true,
    });

    return {
      errors: {
        message: data.message,
      },
    };
  }

  redirect('/account');
}

export async function logoutAction(isRedirect = true) {
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

  if (isRedirect) {
    redirect('/');
  }
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

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;

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

export async function updatePasswordAction(
  _: unknown,
  formData: FormData
): Promise<{ success: boolean; errors: FormError }> {
  const input: UpdatePasswordInput = {
    passwordCurrent: formData.get('passwordCurrent') as string,
    password: formData.get('password') as string,
    passwordConfirm: formData.get('passwordConfirm') as string,
  };

  const validation = validateUpdatePasswordForm(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await updatePassword(input, token);
  if (response.status === 'success') {
    const cookiesStore = await cookies();
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.JWT_COOKIES_EXPIRES_IN!) * 24 * 60 * 60 * 1000
    );
    cookiesStore.set('jwt', response.token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    cookiesStore.delete('reauthenticated');

    revalidatePath('/account');
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

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await addAddress(addressData, token);
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
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;

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

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

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
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return {
      success: false,
      errors: {
        user: 'Please login to continue',
      },
    };

  const token = checkIsLogin.token!;

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
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

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
  const lineItems = JSON.parse(formData.get('lineItems') as string);

  if (!code) {
    return {
      success: false,
      errors: {
        code: 'Discount code is required',
      },
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await verifyDiscountCode(code as string, lineItems, token);

  if (response.data.isValid) {
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
  const decodedUrl = decodeURIComponent(redirectUrl);

  if (!data.password) {
    return {
      errors: {
        password: 'Password is required',
      },
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const cookiesStore = await cookies();
  const response = await reauthenticate(data.password as string, token);

  if (response.status === 'success') {
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.REAUTHENTICATED_COOKIES_EXPIRES_IN!) * 30 * 1000
    );
    cookiesStore.set('reauthenticated', 'true', {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });
    redirect(decodedUrl);
  } else {
    return {
      errors: {
        password: response.message,
      },
    };
  }
}

export async function createCheckoutSessionAction(
  _: unknown,
  formData: FormData
) {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };
  const token = checkIsLogin.token!;

  const data = {
    code: formData.get('code') as string,
    address: formData.get('address') as string,
    paymentMethod: formData.get('paymentMethod') as string,
    lineItems: JSON.parse(formData.get('lineItems') as string),
    processPayment: formData.get('processPayment') as string,
    orderCode: formData.get('orderCode') as string,
  };

  if (!data.address) {
    return {
      errors: {
        message: 'Address is required',
      },
    };
  }

  if (!data.paymentMethod) {
    return {
      errors: {
        message: 'Payment method is required',
      },
    };
  }

  if (!data.lineItems.length) {
    return {
      errors: {
        message: 'Line items are required',
      },
    };
  }

  let checkoutOrder;

  if (data.processPayment === '1') {
    if (!data.orderCode) {
      return {
        errors: {
          message: 'Order code is required',
        },
      };
    }

    const response = await getOrderByOrderCode(data.orderCode, token);

    if (response.status !== 'success') {
      return {
        errors: {
          message: response.message,
        },
      };
    }

    const { order } = response.data;
    checkoutOrder = order;
  } else {
    const createOrderResponse = await createOrder(data, token);

    if (createOrderResponse.status !== 'success') {
      if (
        createOrderResponse.message ===
        'You have an unpaid order. Please complete the payment'
      ) {
        redirect('/cart?error=unpaidOrder');
      } else {
        return {
          errors: {
            message: createOrderResponse.message,
          },
        };
      }
    }

    const { order } = createOrderResponse.data;
    checkoutOrder = order;
  }

  if (checkoutOrder.paymentMethod === 'cod') {
    redirect(`/account/orders/${checkoutOrder.orderCode}`);
  }

  if (checkoutOrder.paymentMethod === 'stripe') {
    const response = await createCheckoutSession(
      checkoutOrder,
      checkIsLogin.token!,
      'Stripe'
    );

    if (response.status === 'success') {
      redirect(response.session.url);
    } else {
      return {
        errors: {
          message: response.message,
        },
      };
    }
  } else if (checkoutOrder.paymentMethod === 'zalopay') {
    const response = await createCheckoutSession(
      checkoutOrder,
      checkIsLogin.token!,
      'ZaloPay'
    );

    if (response.status === 'success') {
      redirect(response.data.order_url);
    }
  }

  // const response = await createCheckoutSession(token);

  // if (response.status === 'success') {
  //   redirect(response.session.url);
  // }
}

export const cancelOrderAction = async (orderId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await cancelOrder(orderId, token);

  if (response.status === 'success') {
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
};

export const createReviewsByOrderAction = async (
  orderId: string,
  reviews: ReviewInput[]
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await createReviewsByOrder(reviews, orderId, token);

  if (response.status === 'success') {
    revalidatePath(`/account/orders/${orderId}`);
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
};

export const updateReviewsByOrderAction = async (
  orderId: string,
  reviews: ReviewUpdateInput[]
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await updateReviewsByOrder(reviews, orderId, token);

  if (response.status === 'success') {
    revalidatePath(`/account/orders/${orderId}`);
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
};

export const getWishlistAction = async () => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return { success: false, wishlist: null };

  const token = checkIsLogin.token!;

  const response = await getWishlist(token);

  if (response.status === 'success') {
    return {
      success: true,
      wishlist: response.data.wishlist as Wishlist,
    };
  } else {
    return {
      success: false,
      wishlist: null,
      errors: {
        message: response.message,
      },
    };
  }
};

export const getWishlistByShareCodeAction = async (shareCode: string) => {
  const response = await getWishlistByShareCode(shareCode);

  if (response.status === 'success') {
    return {
      success: true,
      wishlist: response.data.wishlist as Wishlist,
    };
  } else {
    return {
      success: false,
      wishlist: null,
      errors: {
        message: response.message,
      },
    };
  }
};

export const addProductToWishlistAction = async (productId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return { ...checkIsLogin, wishlist: null };

  const token = checkIsLogin.token!;

  const response = await addProductToWishlist(productId, token);

  if (response.status === 'success') {
    revalidatePath('/wishlist');
    return {
      success: true,
      wishlist: response.data.wishlist,
    };
  } else {
    return {
      success: false,
      wishlist: null,
      errors: {
        message: response.message,
      },
    };
  }
};

export const removeProductFromWishlistAction = async (productId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return { checkIsLogin, wishlist: null };

  const token = checkIsLogin.token!;

  const response = await removeProductFromWishlist(productId, token);

  if (response.status === 'success') {
    revalidatePath('/wishlist');
    return {
      success: true,
      wishlist: response.data.wishlist,
    };
  } else {
    return {
      success: false,
      wishlist: null,
      errors: {
        message: response.message,
      },
    };
  }
};

export const addMultipleItemsToCartAction = async (
  items: { product: string; variant: string; quantity: number }[]
) => {
  const input = items.map((item) => ({
    productId: item.product,
    variantId: item.variant,
    quantity: item.quantity,
  }));

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return { ...checkIsLogin, wishlist: null };

  const token = checkIsLogin.token!;

  const response = await addMultipleItemsToCart(input, token);

  if (response.status === 'success') {
    revalidatePath('/cart');
    return {
      success: true,
      cart: response.data.cart,
    };
  } else {
    return {
      success: false,
      errors: {
        message: response.message,
      },
    };
  }
};

export const storeSelectedCartItemsAction = async (
  items: { product: string; variant: string }[]
) => {
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
  const selectedItems = items.map((item) => {
    return {
      product: item.product,
      variant: item.variant,
    };
  });

  cookiesStore.set('selectedCartItems', JSON.stringify(selectedItems), {
    httpOnly: true,
    secure: true,
  });
  return {
    success: true,
    selectedItems,
  };
};

export const clearCartItemsAction = async () => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;
  const token = checkIsLogin.token!;
  const response = await clearCartItems(token);

  if (response.status === 'success') {
    const cookiesStore = await cookies();
    cookiesStore.delete('selectedCartItems');

    revalidatePath('/cart');
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      errors: {
        message: response.message,
      },
    };
  }
};

export const updateCategoryAction = async (
  _: unknown,
  formData: FormData
): Promise<{
  success: boolean | undefined;
  errors?: FormError;
  input: CategoryInput;
  slug?: string;
}> => {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    slug: formData.get('slug') as string,
    image: formData.get('image') as File | null | string,
    id: formData.get('id') as string,
  } as CategoryInput;

  const validation = validateCategoryForm(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      input: data,
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return { ...checkIsLogin, input: data };

  const token = checkIsLogin.token!;

  const response = await updateCategory(data, token, data.id!);

  if (response.status !== 'success') {
    return {
      success: false,
      errors: {
        message: response.message,
      },
      input: data,
    };
  }

  const { category } = response.data;

  return {
    success: true,
    input: data,
    slug: category.slug,
  };
};

export const addCategoryAction = async (
  _: unknown,
  formData: FormData
): Promise<{
  success: boolean | undefined;
  errors?: FormError;
  input: CategoryInput;
  slug?: string;
}> => {
  const data = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    slug: formData.get('slug') as string,
    image: formData.get('image') as File | null | string,
  } as CategoryInput;

  const validation = validateCategoryForm(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      input: data,
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return { ...checkIsLogin, input: data };

  const token = checkIsLogin.token!;
  const response = await createCategory(data, token);

  if (response.status !== 'success') {
    return {
      success: false,
      errors: {
        message: response.message,
      },
      input: data,
    };
  }

  const { category } = response.data;

  redirect(`/admin/categories/${category.slug}`);
};

export const addProductAction = async (product: ProductInput) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await addProduct(product, token);
  if (response.status === 'success') {
    revalidatePath('/admin/products');
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
};

export const updateProductAction = async (
  product: ProductInput,
  productId: string
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await updateProduct(product, token, productId);
  if (response.status === 'success') {
    revalidatePath('/admin/products');
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
};

export const createShippingOrderAction = async (
  orderId: string,
  orderCode: string
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await createShippingOrder(orderId, token);
  if (response.status === 'success') {
    revalidatePath('/admin/orders/' + orderCode);
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
};

export const updateOrderStatusAction = async (
  orderId: string,
  status: string,
  adminNotes: string,
  orderCode: string
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await updateOrderStatus(orderId, status, adminNotes, token);
  if (response.status === 'success') {
    revalidatePath('/admin/orders/' + orderCode);
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
};

export const refundOrderAction = async (orderId: string, orderCode: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await refundOrder(orderId, token);
  if (response.status === 'success') {
    revalidatePath('/admin/orders/' + orderCode);
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
};

export const deleteProductAction = async (productId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await deleteProduct(productId, token);
  if (response.status === 'success') {
    revalidatePath('/admin/products');
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
};
