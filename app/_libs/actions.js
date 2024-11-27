'use server';

import { validateLoginForm } from '@helpers/validator';
import { getProfile, login, logout } from '@libs/apiServices';
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
        message: loginData.message,
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

export async function logoutAction() {
  const data = await logout();
  console.log(data);

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
