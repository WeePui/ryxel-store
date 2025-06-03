import { Address } from "../_types/address";
import { LineItem } from "../_types/lineItem";
import { Order } from "../_types/order";
import {
  AddressFormInput,
  CategoryInput,
  DiscountInput,
  ProductInput,
  ReviewInput,
  ReviewUpdateInput,
  SignupInput,
  UpdatePasswordInput,
  UpdateProfileInput,
} from "../_types/validateInput";

const API_URL = process.env.API_URL;

interface Filter {
  [key: string]: string;
}

export async function getProducts(filters: Filter = {}) {
  const query = new URLSearchParams(filters).toString();

  const response = await fetch(`${API_URL}/products?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}

export async function getProductById(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const { data } = await response.json();

  return data;
}

export async function getProductBySlug(slug: string) {
  const response = await fetch(`${API_URL}/products/slug/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const { data } = await response.json();

  return data;
}

export async function login(loginInput: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInput),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function signup(input: SignupInput) {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function sendOTP(token: { value: string }) {
  const response = await fetch(`${API_URL}/users/sendOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function logout() {
  const response = await fetch(`${API_URL}/users/logout`);

  if (!response.ok) {
    throw new Error("Failed to log out");
  }

  const data = await response.json();

  return data;
}

export async function getProfile(token: { value: string }) {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) throw new Error("Failed to fetch user");

  const data = await response.json();

  return data;
}

export async function checkToken(token: { value: string }) {
  if (!token) {
    return { valid: false, expired: false };
  }

  const response = await fetch(`${API_URL}/users/verifyToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token.value }),
  });

  const { valid, expired, isAdmin } = await response.json();
  return { valid, expired, isAdmin };
}

export async function checkEmailAvailability(email: string) {
  const response = await fetch(`${API_URL}/users/checkEmailExists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to check email availability");
  }

  return { valid: true };
}

export async function verifyOTP(otp: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/users/verifyOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ otp }),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/users/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  return data;
}

export async function resetPassword(
  formData: { password: string; passwordConfirm: string },
  resetToken: string,
) {
  const response = await fetch(`${API_URL}/users/resetPassword/${resetToken}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function updateProfile(
  input: UpdateProfileInput,
  token: { value: string },
) {
  const form = new FormData();
  for (const key of Object.keys(input) as (keyof UpdateProfileInput)[]) {
    const value = input[key];
    if (value !== null && value !== undefined) {
      form.append(key as string, value as string | Blob);
    }
  }

  const response = await fetch(`${API_URL}/users/updateProfile`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: form,
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function updatePassword(
  input: UpdatePasswordInput,
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/users/updatePassword`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();

    return {
      success: false,
      message: await error.message,
    };
  }

  const data = await response.json();

  return data;
}

export async function getAddresses(token: { value: string }) {
  const response = await fetch(`${API_URL}/addresses`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function addAddress(
  formData: AddressFormInput,
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function deleteAddress(id: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete address");
  }
}

export async function updateAddress(
  id: string,
  formData: { [key: string]: { code: string | number; name: string } | string },
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/addresses/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function setDefaultAddress(id: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/addresses/${id}/default`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function getCart(token: { value: string }) {
  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function addOrUpdateCartItem(
  productId: string,
  variantId: string,
  quantity: number,
  token: { value: string },
) {
  const response = await fetch(
    `${API_URL}/cart/items/${productId}/${variantId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
      credentials: "include",
    },
  );

  const data = await response.json();

  return data;
}

export async function removeCartItem(
  productId: string,
  variantId: string,
  token: { value: string },
) {
  const response = await fetch(
    `${API_URL}/cart/items/${productId}/${variantId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    },
  );

  const data = await response.json();

  return data;
}

export async function verifyDiscountCode(
  code: string,
  lineItems: LineItem[],
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/discounts/${code}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lineItems }),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function reauthenticate(
  password: string,
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/users/reauthenticate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
    credentials: "include",
  });

  const data = await response.json();

  return data;
}

export async function createCheckoutSession(
  order: Order,
  token: { value: string },
  method: "Stripe" | "ZaloPay",
) {
  const response = await fetch(
    `${API_URL}/payments/create${method}CheckoutSession`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create checkout session");
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
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    if (
      error.message === "You have an unpaid order. Please complete the payment"
    ) {
      return {
        status: "error",
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
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    if (error.message === "No unpaid order found for this user") {
      return {
        status: "No unpaid order found",
        message: error.message,
      };
    }

    throw new Error("Failed to check unpaid order");
  }

  const data = await response.json();

  return data;
};

export async function getOrders(token: { value: string }, search: string) {
  const response = await fetch(`${API_URL}/orders?search=${search}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await response.json();

  return data;
}

export async function getOrderById(id: string, token: { value: string }) {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order");
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
  }[],
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/orders/shippingFee?toWardCode=${address.ward.code}&toDistrictCode=${address.district.code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    },
  );

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch shipping fee");
  }

  const data = await response.json();

  return data;
};

export const cancelOrder = async (id: string, token: { value: string }) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/orders/${id}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to cancel order");
  }

  const data = await response.json();

  return data;
};

export const getOrderByOrderCode = async (
  code: string,
  token: { value: string },
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/orders/orderCode/${code}`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  const data = await response.json();

  return data;
};

export const createReviewsByOrder = async (
  reviews: ReviewInput[],
  orderId: string,
  token: { value: string },
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
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
      credentials: "include",
    },
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
  token: { value: string },
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
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error(await response.json().then((err) => err.message));
  }

  const data = await response.json();

  return data;
};

export const getWishlist = async (token: { value: string }) => {
  const response = await fetch(`http://localhost:8000/api/v1/wishlist`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  const data = await response.json();

  return data;
};

export const addProductToWishlist = async (
  productId: string,
  token: { value: string },
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/wishlist/${productId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add product to wishlist");
  }

  const data = await response.json();

  return data;
};

export const getWishlistByShareCode = async (shareCode: string) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/wishlist/${shareCode}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  const data = await response.json();

  return data;
};

export const removeProductFromWishlist = async (
  productId: string,
  token: { value: string },
) => {
  const response = await fetch(
    `http://localhost:8000/api/v1/wishlist/${productId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to remove product from wishlist");
  }

  const data = await response.json();

  return data;
};

export const addMultipleItemsToCart = async (
  items: { productId: string; variantId: string; quantity: number }[],
  token: { value: string },
) => {
  const response = await fetch(`${API_URL}/cart/items`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
    credentials: "include",
  });

  const data = await response.json();

  return data;
};

export async function getFilterData(filters: Filter) {
  const query = new URLSearchParams(filters).toString();

  const response = await fetch(`${API_URL}/products/filters?${query}`);

  if (!response.ok) {
    throw new Error("Failed to fetch filter data");
  }

  const data = await response.json();

  return data;
}

export async function getBestsellers() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/top-5-bestsellers`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bestsellers");
  }

  const data = await response.json();

  return data;
}

export async function clearCartItems(token: { value: string }) {
  const response = await fetch(`${API_URL}/cart/items`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

export async function getDashboardStats(token: { value: string }) {
  const response = await fetch(`${API_URL}/admin/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  const data = await response.json();

  return data;
}

export async function getRecentOrders(token: { value: string }) {
  const response = await fetch(`${API_URL}/admin/dashboard/recent-orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recent orders");
  }

  const data = await response.json();

  return data;
}

export async function getCategories(token: { value: string }) {
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  const { data } = await response.json();
  return data;
}

export async function getCategoryBySlug(
  slug: string,
  token: { value: string },
) {
  const response = await fetch(`${API_URL}/categories/slug/${slug}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  const { data } = await response.json();

  return data;
}

export const getStockData = async (token: { value: string }) => {
  const response = await fetch(`${API_URL}/admin/products/stock`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stock date");
  }

  const data = await response.json();

  return data;
};

export const getProductsSummary = async (token: { value: string }) => {
  const response = await fetch(`${API_URL}/admin/products/summary`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products summary");
  }

  const data = await response.json();

  return data;
};

export const getRecommendedProducts = async (productId: string) => {
  const response = await fetch(
    `${API_URL}/products/cart-product-recommend/${productId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recommended products");
  }

  const { data } = await response.json();

  return data;
};

export const getSimilarProducts = async (productId: string) => {
  const response = await fetch(
    `${API_URL}/products/similar-products/${productId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch similar products");
  }

  const { data } = await response.json();

  return data;
};

export const getClientCategories = async () => {
  const response = await fetch(`${API_URL}/categories/client`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const { data } = await response.json();

  return data;
};

export const getCategorySummary = async (
  token: { value: string },
  slug: string,
) => {
  const response = await fetch(`${API_URL}/categories/slug/${slug}/summary`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories summary");
  }

  const { data } = await response.json();

  return data;
};

export const addCategory = async (
  formData: FormData,
  token: { value: string },
) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add category");
  }

  const data = await response.json();
  return data;
};

export const updateCategory = async (
  input: CategoryInput,
  token: { value: string },
  id: string,
) => {
  const formData = new FormData();
  for (const key of Object.keys(input) as (keyof CategoryInput)[]) {
    const value = input[key];
    if (value !== null && value !== undefined) {
      formData.append(key as string, value as string | Blob);
    }
  }

  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update category");
  }

  const data = await response.json();
  return data;
};

export const createCategory = async (
  input: CategoryInput,
  token: { value: string },
) => {
  const formData = new FormData();
  for (const key of Object.keys(input) as (keyof CategoryInput)[]) {
    const value = input[key];
    if (value !== null && value !== undefined) {
      formData.append(key as string, value as string | Blob);
    }
  }

  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  const data = await response.json();
  return data;
};

export const addProduct = async (
  product: ProductInput,
  token: { value: string },
) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("slug", product.slug);
  formData.append("brand", product.brand);
  formData.append("category", product.category);
  formData.append("description", product.description);

  // Thêm ảnh cover nếu là file
  if (product.imageCover instanceof File) {
    formData.append("imageCover", product.imageCover);
  }

  // Thêm variants (dữ liệu text)
  formData.append(
    "variants",
    JSON.stringify(
      product.variants.map((v) => ({
        ...v,
        images: v.images.map((img) => (img instanceof File ? null : img)),
      })),
    ),
  );

  // Thêm ảnh của từng variant (nếu có file)
  product.variants.forEach((variant, variantIndex) => {
    variant.images.forEach((image, imageIndex) => {
      if (image instanceof File) {
        formData.append(`variantImages_${variantIndex}_${imageIndex}`, image);
      }
    });
  });

  console.log("hello");

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  const data = await response.json();
  return data;
};

export const updateProduct = async (
  product: ProductInput,
  token: { value: string },
  id: string,
) => {
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("slug", product.slug);
  formData.append("brand", product.brand);
  formData.append("category", product.category);
  formData.append("description", product.description);

  // imageCover có thể là string (URL cũ) hoặc File mới
  if (product.imageCover instanceof File) {
    formData.append("imageCover", product.imageCover);
  } else {
    formData.append("imageCover", product.imageCover as string); // URL string
  }

  // Biến variants thành JSON (trừ images)
  const variantsWithoutImages = product.variants.map((variant) => {
    const { ...rest } = variant;
    delete (rest as { images?: unknown }).images;
    return rest;
  });
  formData.append("variants", JSON.stringify(variantsWithoutImages));

  // Append ảnh variants (mỗi ảnh đặt tên cho rõ variant index + image index)
  product.variants.forEach((variant, variantIndex) => {
    variant.images.forEach((image, imageIndex) => {
      if (image instanceof File) {
        formData.append(`variantImages[${variantIndex}][${imageIndex}]`, image);
      } else {
        formData.append(
          `variantImageUrls[${variantIndex}][${imageIndex}]`,
          image,
        );
      }
    });
  });

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  const data = await response.json();
  return data;
};

export const createShippingOrder = async (
  orderId: string,
  token: { value: string },
) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/shipping-order`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to create shipping order");
  }

  const data = await response.json();

  return data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: string,
  adminNotes: string,
  token: { value: string },
) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify({ status, adminNotes }),
  });

  if (!response.ok) {
    throw new Error("Failed to update order status");
  }

  const data = await response.json();

  return data;
};

export const refundOrder = async (
  orderId: string,
  token: { value: string },
) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/refund`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Refund not successful");
  }

  const data = await response.json();

  return data;
};

export const downloadFile = async (url: string, token: { value: string }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await res.blob();
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = url.includes("pdf") ? "order.pdf" : "order.xlsx";
  a.click();
};

interface AdminOrdersFilter {
  search?: string;
  startDate?: string;
  endDate?: string;
  total?: number;
  status?: string;
  paymentMethod?: string;
}

export const getAdminOrders = async (
  authToken: string,
  filter: AdminOrdersFilter,
) => {
  const filterParams = new URLSearchParams();
  for (const key in filter) {
    if (filter[key as keyof AdminOrdersFilter] !== undefined) {
      filterParams.append(
        key,
        filter[key as keyof AdminOrdersFilter] as string,
      );
    }
  }

  const response = await fetch(
    `${API_URL}/orders/all-orders?${filterParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const { data } = await response.json();
  return data;
};

export const getOrderSummaryStats = async (authToken: string) => {
  const response = await fetch(`${API_URL}/admin/orders/summary`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order summary stats");
  }
  const { data } = await response.json();
  return data;
};

export const deleteProduct = async (id: string, token: { value: string }) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return { status: "success", message: "Product deleted successfully" };
};

export const sendOrderViaEmail = async (orderId: string, authToken: string) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/send-email`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to send order email");
  }

  const data = await response.json();
  return data;
};

export const deleteCategory = async (id: string, authToken: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }

  return { status: "success", message: "Category deleted successfully" };
};

export const getDiscounts = async (authToken: string) => {
  const response = await fetch(`${API_URL}/discounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch discounts");
  }

  const { data } = await response.json();

  return data;
};

export const addDiscount = async (input: DiscountInput, authToken: string) => {
  const response = await fetch(`${API_URL}/discounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to add discount");
  }

  const data = await response.json();
  return data;
};

export const updateDiscount = async (
  id: string,
  input: DiscountInput,
  authToken: string,
) => {
  const response = await fetch(`${API_URL}/discounts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to update discount");
  }

  const data = await response.json();
  return data;
};

export const deleteDiscount = async (id: string, authToken: string) => {
  const response = await fetch(`${API_URL}/discounts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete discount");
  }
  return { status: "success", message: "Discount deleted successfully" };
};

interface UserFilter {
  search?: string;
  role?: string;
  emailVerified?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export const getAllUsers = async (
  authToken: string,
  filter: UserFilter = {},
) => {
  const filterParams = new URLSearchParams();

  for (const key in filter) {
    if (filter[key as keyof UserFilter] !== undefined) {
      filterParams.append(key, filter[key as keyof UserFilter] as string);
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users?${filterParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const { data } = await response.json();
  return data;
};

interface UserFilter {
  search?: string;
  role?: string;
  emailVerified?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

// Get user analytics data
export const getUserAnalytics = async (userId: string, authToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/analytics`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user analytics");
  }

  const data = await response.json();
  return data;
};

// Get user order history
export const getUserOrderHistory = async (
  userId: string,
  authToken: string,
  filters: {
    page?: number;
    limit?: number;
    status?: string;
    sort?: string;
  } = {},
) => {
  const filterParams = new URLSearchParams();
  for (const key in filters) {
    if (filters[key as keyof typeof filters] !== undefined) {
      filterParams.append(key, filters[key as keyof typeof filters] as string);
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/orders?${filterParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user order history");
  }

  const data = await response.json();
  return data;
};

// Update user status (email verification, active status, role)
export const updateUserStatus = async (
  userId: string,
  statusData: {
    emailVerified?: boolean;
    active?: boolean;
    role?: string;
  },
  authToken: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(statusData),
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update user status");
  }

  const data = await response.json();
  return data;
};

// Get individual user by ID
export const getUserById = async (userId: string, authToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data;
};

// FCM Token Registration
export const registerFcmToken = async (
  token: string,
  authToken: { value: string },
) => {
  const response = await fetch(`${API_URL}/users/fcm-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      fcmToken: token,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to register FCM token");
  }

  const data = await response.json();
  return data;
};

// Delete FCM token
export const deleteFcmToken = async (
  token: string,
  authToken: { value: string },
) => {
  const response = await fetch(`${API_URL}/users/fcm-token`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      fcmToken: token,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete FCM token");
  }

  const data = await response.json();
  return data;
};

// =================
// Notification Management APIs
// =================

// Register FCM token for notifications
export const registerNotificationToken = async (
  token: string,
  platform: string,
  deviceInfo: string,
  authToken: { value: string },
) => {
  const response = await fetch(`${API_URL}/notifications/tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      token,
      platform,
      deviceInfo,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to register notification token");
  }

  const data = await response.json();
  return data;
};

// Unregister FCM token
export const unregisterNotificationToken = async (
  token: string,
  authToken: { value: string },
) => {
  const response = await fetch(`${API_URL}/notifications/tokens`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      token,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to unregister notification token");
  }

  const data = await response.json();
  return data;
};

// Get user notifications
export const getUserNotifications = async (
  authToken: { value: string },
  page: number = 1,
  limit: number = 20,
  type?: string,
  isRead?: boolean,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (type) params.append("type", type);
  if (isRead !== undefined) params.append("isRead", isRead.toString());

  const response = await fetch(`${API_URL}/notifications/user?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data = await response.json();
  return data;
};

// Mark notification as read
export const markNotificationAsRead = async (
  notificationId: string,
  authToken: { value: string },
) => {
  const response = await fetch(
    `${API_URL}/notifications/user/mark-read/${notificationId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to mark notification as read");
  }

  const data = await response.json();
  return data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (authToken: {
  value: string;
}) => {
  const response = await fetch(`${API_URL}/notifications/user/mark-all-read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authToken.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to mark all notifications as read");
  }

  const data = await response.json();
  return data;
};

// Delete notification
export const deleteNotification = async (
  notificationId: string,
  authToken: { value: string },
) => {
  const response = await fetch(
    `${API_URL}/notifications/user/${notificationId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete notification");
  }

  const data = await response.json();
  return data;
};

// Delete all notifications
export const deleteAllNotifications = async (authToken: { value: string }) => {
  const response = await fetch(`${API_URL}/notifications/user/delete-all`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete all notifications");
  }

  const data = await response.json();
  return data;
};

// =================
// Admin Notification APIs
// =================

// Get notification statistics (admin only)
export const getNotificationStats = async (authToken: { value: string }) => {
  const response = await fetch(`${API_URL}/notifications/stats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notification stats");
  }

  const data = await response.json();
  return data;
};

// Get notification history (admin only)
export const getNotificationHistory = async (
  authToken: { value: string },
  page: number = 1,
  limit: number = 50,
  type?: string,
  startDate?: string,
  endDate?: string,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (type) params.append("type", type);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const response = await fetch(`${API_URL}/notifications/history?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notification history");
  }

  const data = await response.json();
  return data;
};

// Send promotional notification (admin only)
export const sendPromotionalNotification = async (
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
  targetUsers?: string[],
) => {
  const response = await fetch(`${API_URL}/notifications/promotional`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      title,
      body,
      data: notificationData,
      targetUsers,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to send promotional notification");
  }

  const result = await response.json();
  return result;
};

// Send notification to specific user (admin only)
export const sendNotificationToUser = async (
  userId: string,
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
) => {
  const response = await fetch(`${API_URL}/notifications/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      userId,
      payload: {
        title,
        body,
        data: notificationData,
      },
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to send notification");
  }

  const result = await response.json();
  return result;
};

// Send notification to multiple users (admin only)
export const sendNotificationToMultipleUsers = async (
  userIds: string[],
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
) => {
  const response = await fetch(`${API_URL}/notifications/send-multiple`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      userIds,
      title,
      body,
      data: notificationData,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to send notifications");
  }

  const result = await response.json();
  return result;
};

// Send notification to all users (admin only)
export const sendNotificationToAllUsers = async (
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
) => {
  const response = await fetch(`${API_URL}/notifications/send-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken.value}`,
    },
    body: JSON.stringify({
      title,
      body,
      data: notificationData,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to send notification to all users");
  }

  const result = await response.json();
  return result;
};
