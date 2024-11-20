const API_URL = process.env.API_URL;

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  if (data.status === 'error' || data.status === 'fail') {
    throw new Error(data.message);
  }

  return data.data;
}
