const API_URL = process.env.API_URL;

export async function getProducts(filters = {}) {
  const query = new URLSearchParams(filters).toString();

  const response = await fetch(`${API_URL}/products?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return data;
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const { data } = await response.json();

  return data;
}

export async function login(formData) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function signup(formData) {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
}

export async function sendOTP(token) {
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

export async function getProfile(token) {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) throw new Error('Failed to fetch user');

  const { data } = await response.json();

  return data;
}

export async function checkToken(token) {
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

export async function checkEmailAvailability(email) {
  const response = await fetch(`${API_URL}/users/checkEmailExists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) return { valid: false };
  else return { valid: true };
}

export async function verifyOTP(otp, token) {
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

export async function forgotPassword(email) {
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

export async function resetPassword(formData, resetToken) {
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
