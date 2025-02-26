import {
  SignupInput,
  UpdatePasswordInput,
  UpdateProfileInput,
} from '../_types/validateInput';

const API_URL = process.env.API_URL;

interface Filter {
  [key: string]: string;
}

export async function getProducts(filters: Filter = {}) {
  const query = new URLSearchParams(filters).toString();
  console.log('query', query);
  console.log('filter', filters);

  const response = await fetch(`${API_URL}/products?${query}`);
  console.log(`${API_URL}/products?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return data;
}

export async function getProductById(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`);

  console.log(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const { data } = await response.json();

  return data;
}

export async function login(loginInput: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginInput),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function signup(input: SignupInput) {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function sendOTP(token: { value: string }) {
  const response = await fetch(`${API_URL}/users/sendOTP`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}/users/logout`);

  if (!response.ok) {
    throw new Error('Failed to log out');
  }

  const data = await response.json();

  return data;
}

export async function getProfile(token: { value: string }) {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to fetch user');

  const data = await response.json();

  return data;
}

export async function checkToken(token: { value: string }) {
  if (!token) {
    return { valid: false, expired: false };
  }

  const response = await fetch(`${API_URL}/users/verifyToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token.value }),
  });

  const { valid, expired } = await response.json();
  return { valid, expired };
}

export async function checkEmailAvailability(email: string) {
  const response = await fetch(`${API_URL}/users/checkEmailExists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to check email availability');
  }

  return { valid: true };
}

export async function verifyOTP(otp: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/users/verifyOTP`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ otp }),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/users/forgotPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  return data;
}

export async function resetPassword(
  formData: { password: string; passwordConfirm: string },
  resetToken: string
) {
  const response = await fetch(`${API_URL}/users/resetPassword/${resetToken}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function updateProfile(
  input: UpdateProfileInput,
  token: { value: string }
) {
  console.log('formData', input);

  const form = new FormData();
  for (const key of Object.keys(input) as (keyof UpdateProfileInput)[]) {
    const value = input[key];
    if (value !== null && value !== undefined) {
      form.append(key as string, value as string | Blob);
    }
  }

  const response = await fetch(`${API_URL}/users/updateProfile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: form,
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function updatePassword(
  input: UpdatePasswordInput,
  token: { value: string }
) {
  const response = await fetch(`${API_URL}/users/updatePassword`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to update password');
  }

  const data = await response.json();

  return data;
}

export async function getAddresses(token: { value: string }) {
  const response = await fetch(`${API_URL}/addresses`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function addAddress(
  formData: {
    [key: string]: { code: string | number; name: string } | string;
  },
  token: { value: string }
) {
  const response = await fetch(`${API_URL}/addresses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function deleteAddress(id: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/addresses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete address');
  }
}

export async function updateAddress(
  id: string,
  formData: { [key: string]: { code: string | number; name: string } | string },
  token: { value: string }
) {
  const response = await fetch(`${API_URL}/addresses/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function setDefaultAddress(id: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/addresses/${id}/default`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function getCart(token: { value: string }) {
  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function addOrUpdateCartItem(
  productId: string,
  variantId: string,
  quantity: number,
  token: { value: string }
) {
  console.log(`${API_URL}/items/${productId}/${variantId}`);

  const response = await fetch(
    `${API_URL}/cart/items/${productId}/${variantId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
      credentials: 'include',
    }
  );

  const data = await response.json();

  return data;
}

export async function removeCartItem(
  productId: string,
  variantId: string,
  token: { value: string }
) {
  const response = await fetch(
    `${API_URL}/cart/items/${productId}/${variantId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: 'include',
    }
  );

  const data = await response.json();

  return data;
}

export async function verifyDiscountCode(
  code: string,
  token: { value: string }
) {
  console.log(`${API_URL}/discounts/${code}`);

  const response = await fetch(`${API_URL}/discounts/${code}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function reauthenticate(
  password: string,
  token: { value: string }
) {
  const response = await fetch(`${API_URL}/users/reauthenticate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function createCheckoutSession(token: { value: string }) {
  const response = await fetch(`${API_URL}/payments/createCheckoutSession`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}
