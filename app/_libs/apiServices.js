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
