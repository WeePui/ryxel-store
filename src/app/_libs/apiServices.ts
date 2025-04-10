import { Address } from '../_types/address';
import { LineItem } from '../_types/lineItem';
import { Order } from '../_types/order';
import {
  AddressFormInput,
  ReviewInput,
  ReviewUpdateInput,
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

  const response = await fetch(`${API_URL}/products?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  return data;
}

export async function getProductById(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }

  const { data } = await response.json();

  return data;
}

export async function getProductBySlug(slug: string) {
  const response = await fetch(`${API_URL}/products/slug/${slug}`);

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
  formData: AddressFormInput,
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
  lineItems: LineItem[],
  token: { value: string }
) {
  const response = await fetch(`${API_URL}/discounts/${code}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lineItems }),
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

export async function createCheckoutSession(
  order: Order,
  token: { value: string },
  method: 'Stripe' | 'ZaloPay'
) {
  const response = await fetch(
    `${API_URL}/payments/create${method}CheckoutSession`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const result = await response.json();

  return result;
}

export async function createOrder(
  data: {
    code?: string;
    address: string;
    paymentMethod: string;
    lineItems: LineItem[];
  },
  token: { value: string }
) {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    if (
      error.message === 'You have an unpaid order. Please complete the payment'
    ) {
      return {
        status: 'error',
        message: error.message,
      };
    }

    throw new Error(error.message);
  }

  const result = await response.json();

  return result;
}

export const checkUnpaidOrder = async (token: { value: string }) => {
  const response = await fetch(`${API_URL}/orders/checkUnpaidOrder`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    if (error.message === 'No unpaid order found for this user') {
      return {
        status: 'No unpaid order found',
        message: error.message,
      };
    }

    throw new Error('Failed to check unpaid order');
  }

  const data = await response.json();

  return data;
};

export async function getOrders(token: { value: string }, search: string) {
  const response = await fetch(`${API_URL}/orders?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data = await response.json();

  return data;
}

export async function getOrderById(id: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  const data = await response.json();

  return data;
}

export const getShippingFee = async (
  address: Address,
  lineItems: {
    product: string;
    variant: string;
    quantity: number;
  }[]
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/orders/shippingFee?toWardCode=${address.ward.code}&toDistrictCode=${address.district.code}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    }
  );

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch shipping fee');
  }

  const data = await response.json();

  return data;
};

export const cancelOrder = async (id: string, token: { value: string }) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/orders/${id}/cancel`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to cancel order');
  }

  const data = await response.json();

  return data;
};

export const getOrderByOrderCode = async (
  code: string,
  token: { value: string }
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/orders/orderCode/${code}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }

  const data = await response.json();

  return data;
};

export const createReviewsByOrder = async (
  reviews: ReviewInput[],
  orderId: string,
  token: { value: string }
) => {
  const formData = new FormData();

  reviews.forEach((review, index) => {
    formData.append(`reviews[${index}][productId]`, review.productId);
    formData.append(`reviews[${index}][variantId]`, review.variantId);
    formData.append(`reviews[${index}][rating]`, review.rating.toString());
    formData.append(`reviews[${index}][review]`, review.review);

    // Gửi từng ảnh vào đúng index của sản phẩm
    review.images.forEach((file, imgIndex) => {
      formData.append(`reviews[${index}][images][${imgIndex}]`, file);
    });

    if (review.video) formData.append(`reviews[${index}][video]`, review.video);
  });

  const response = await fetch(
    `http://localhost:8000/api/v1/reviews/order/${orderId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(await response.json().then((err) => err.message));
  }

  const data = await response.json();

  return data;
};

export const updateReviewsByOrder = async (
  reviews: ReviewUpdateInput[],
  orderId: string,
  token: { value: string }
) => {
  const formData = new FormData();

  reviews.forEach((review) => {
    formData.append(`reviews[${review._id}][rating]`, review.rating.toString());
    formData.append(`reviews[${review._id}][review]`, review.review);

    // Gửi từng ảnh vào đúng index của sản phẩm
    review.images.forEach((file, imgIndex) => {
      formData.append(`reviews[${review._id}][images][${imgIndex}]`, file);
    });

    if (review.video)
      formData.append(`reviews[${review._id}][video]`, review.video);
  });

  const response = await fetch(
    `http://localhost:8000/api/v1/reviews/order/${orderId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error(await response.json().then((err) => err.message));
  }

  const data = await response.json();

  return data;
};

export const getWishlist = async (token: { value: string }) => {
  const response = await fetch(`http://localhost:8000/api/v1/wishlist`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  const data = await response.json();

  return data;
};

export const addProductToWishlist = async (
  productId: string,
  token: { value: string }
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/wishlist/${productId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add product to wishlist');
  }

  const data = await response.json();

  return data;
};

export const getWishlistByShareCode = async (shareCode: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/wishlist/${shareCode}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  const data = await response.json();

  return data;
};

export const removeProductFromWishlist = async (
  productId: string,
  token: { value: string }
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/wishlist/${productId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: 'include',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to remove product from wishlist');
  }

  const data = await response.json();

  return data;
};

export const addMultipleItemsToCart = async (
  items: { productId: string; variantId: string; quantity: number }[],
  token: { value: string }
) => {
  const response = await fetch(`${API_URL}/cart/items`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
    credentials: 'include',
  });

  const data = await response.json();

  return data;
};

export async function getFilterData(filters: Filter) {
  const query = new URLSearchParams(filters).toString();

  const response = await fetch(`${API_URL}/products/filters?${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch filter data');
  }

  const data = await response.json();

  return data;
}

export async function getBestsellers() {
  const response = await fetch(`${API_URL}/products/top-5-bestsellers`);

  if (!response.ok) {
    throw new Error('Failed to fetch bestsellers');
  }

  const data = await response.json();

  return data;
}
