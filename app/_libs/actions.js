'use server';

import { validateLoginForm, validateSignupForm } from '@helpers/validator';
import {
  login,
  signup,
  logout,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from '@libs/apiServices';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(_, formData) {
  const data = Object.fromEntries(formData);

  const validation = validateLoginForm(data);
  if (!validation.success) {
    return {
      errors: validation.errors,
    };
  }

  const loginData = await login(data);

  if (loginData.message)
    return {
      errors: {
        email: loginData.message,
      },
    };

  const cookiesStore = await cookies();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  cookiesStore.set('jwt', loginData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  redirect('/account');
}

export async function signupAction(_, formData) {
  const data = Object.fromEntries(formData);

  const validation = await validateSignupForm(data);
  if (!validation.success) {
    return {
      inputData: data,
      errors: validation.errors,
    };
  }

  const signupData = await signup(data);

  if (signupData.message)
    return {
      inputData: data,
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

  await sendOTPAction();

  redirect('/signup/verifyEmail');
}

export const sendOTPAction = async ({ counter }) => {
  try {
    const cookiesStore = cookies();
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
      errors: { message: error.message || 'An unknown error occurred.' },
    };
  }
};

export async function verifyOTPAction(_, formData) {
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
  const data = await verifyOTP(otp, token);
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
  redirect('/');
}

export async function forgotPasswordAction(_, formData) {
  const { email } = Object.fromEntries(formData);

  if (!email) {
    return {
      errors: {
        message: 'E-mail address is required',
      },
    };
  }

  try {
    const data = await forgotPassword(email);
    if (data.status === 'success') {
      return {
        success: true,
      };
    } else throw new Error(data.message || 'Failed to send reset token.');
  } catch (error) {
    return {
      errors: {
        message: error.message,
      },
    };
  }
}

export async function resetPasswordAction(_, formData) {
  const { password, passwordConfirm, resetToken } =
    Object.fromEntries(formData);

  if (!password || !passwordConfirm) {
    return {
      errors: {
        password: 'Password and password confirm are required',
      },
    };
  }

  if (password !== passwordConfirm) {
    return {
      errors: {
        password: 'Password and password confirm do not match',
      },
    };
  }

  // Reset password
  try {
    const data = await resetPassword({ password, passwordConfirm }, resetToken);
    if (data.status === 'success') redirect('/account');
    else return { fail: true };
  } catch (error) {
    return {
      fail: true,
    };
  }
}
