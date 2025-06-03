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
  try {
    const query = new URLSearchParams(filters).toString();

    const response = await fetch(`${API_URL}/products?${query}`);

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch products",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getProducts:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching products",
      statusCode: 0
    };
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch product",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getProductById:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching product",
      statusCode: 0
    };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/products/slug/${slug}`);

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch product",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getProductBySlug:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching product",
      statusCode: 0
    };
  }
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
  try {
    const response = await fetch(`${API_URL}/users/logout`);

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to log out",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in logout:", error);
    return {
      status: "error",
      message: "Network error occurred during logout",
      statusCode: 0
    };
  }
}

export async function getProfile(token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch user",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      status: "error",
      message: "Network error while fetching user",
      statusCode: 0
    };
  }
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
  try {
    const response = await fetch(`${API_URL}/users/checkEmailExists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to check email availability",
        statusCode: response.status
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("Network error in checkEmailAvailability:", error);
    return {
      status: "error",
      message: "Network error occurred while checking email availability",
      statusCode: 0
    };
  }
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
  try {
    const response = await fetch(`${API_URL}/addresses`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch addresses",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return {
      status: "error",
      message: "Network error while fetching addresses",
      statusCode: 0
    };
  }
}

export async function addAddress(
  formData: AddressFormInput,
  token: { value: string },
) {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to add address",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error adding address:", error);
    return {
      status: "error",
      message: "Network error while adding address",
      statusCode: 0
    };
  }
}

export async function deleteAddress(id: string, token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/addresses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to delete address",
        statusCode: response.status
      };
    }

    return { status: "success", message: "Address deleted successfully" };
  } catch (error) {
    console.error("Error deleting address:", error);
    return {
      status: "error",
      message: "Network error while deleting address",
      statusCode: 0
    };
  }
}

export async function updateAddress(
  id: string,
  formData: { [key: string]: { code: string | number; name: string } | string },
  token: { value: string },
) {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to update address",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error updating address:", error);
    return {
      status: "error",
      message: "Network error while updating address",
      statusCode: 0
    };
  }
}

export async function setDefaultAddress(id: string, token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/addresses/${id}/default`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to set default address",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error setting default address:", error);
    return {
      status: "error",
      message: "Network error while setting default address",
      statusCode: 0
    };
  }
}

export async function getCart(token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to fetch cart",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      status: "error",
      message: "Network error while fetching cart",
      statusCode: 0
    };
  }
}

export async function addOrUpdateCartItem(
  productId: string,
  variantId: string,
  quantity: number,
  token: { value: string },
) {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to add item to cart",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error adding/updating cart item:", error);
    return {
      status: "error",
      message: "Network error while updating cart",
      statusCode: 0
    };
  }
}

export async function removeCartItem(
  productId: string,
  variantId: string,
  token: { value: string },
) {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to remove item from cart",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    return {
      status: "error",
      message: "Network error while removing cart item",
      statusCode: 0
    };
  }
}

export async function verifyDiscountCode(
  code: string,
  lineItems: LineItem[],
  token: { value: string },
) {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to verify discount code",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error verifying discount code:", error);
    return {
      status: "error",
      message: "Network error while verifying discount code",
      statusCode: 0
    };
  }
}

export async function reauthenticate(
  password: string,
  token: { value: string },
) {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to reauthenticate",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error reauthenticating:", error);
    return {
      status: "error",
      message: "Network error while reauthenticating",
      statusCode: 0
    };
  }
}

export async function createCheckoutSession(
  order: Order,
  token: { value: string },
  method: "Stripe" | "ZaloPay",
) {
  try {
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
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to create checkout session",
        statusCode: response.status
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      status: "error",
      message: "Network error while creating checkout session",
      statusCode: 0
    };
  }
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
  try {
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
      const error = await response.json().catch(() => ({}));
      if (
        error.message === "You have an unpaid order. Please complete the payment"
      ) {
        return {
          status: "error",
          message: error.message,
        };
      }

      return {
        status: "error",
        message: error.message || "Failed to create order",
        statusCode: response.status
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      status: "error",
      message: "Network error while creating order",
      statusCode: 0
    };
  }
}

export const checkUnpaidOrder = async (token: { value: string }) => {
  try {
    const response = await fetch(`${API_URL}/orders/checkUnpaidOrder`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (error.message === "No unpaid order found for this user") {
        return {
          status: "No unpaid order found",
          message: error.message,
        };
      }

      return {
        status: "error",
        message: error.message || "Failed to check unpaid order",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking unpaid order:", error);
    return {
      status: "error",
      message: "Network error while checking unpaid order",
      statusCode: 0
    };
  }
};

export async function getOrders(token: { value: string }, search: string) {
  try {
    const response = await fetch(`${API_URL}/orders?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch orders",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      status: "error",
      message: "Network error while fetching orders",
      statusCode: 0
    };
  }
}

export async function getOrderById(id: string, token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch order",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return {
      status: "error",
      message: "Network error while fetching order",
      statusCode: 0
    };
  }
}

export const getShippingFee = async (
  address: Address,
  lineItems: {
    product: string;
    variant: string;
    quantity: number;
  }[],
) => {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch shipping fee",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getShippingFee:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching shipping fee",
      statusCode: 0
    };
  }
};

export const cancelOrder = async (id: string, token: { value: string }) => {
  try {
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
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to cancel order",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error cancelling order:", error);
    return {
      status: "error",
      message: "Network error while cancelling order",
      statusCode: 0
    };
  }
};

export const getOrderByOrderCode = async (
  code: string,
  token: { value: string },
) => {
  try {
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
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch order",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order by code:", error);
    return {
      status: "error",
      message: "Network error while fetching order",
      statusCode: 0
    };
  }
};

export const createReviewsByOrder = async (
  reviews: ReviewInput[],
  orderId: string,
  token: { value: string },
) => {
  try {
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
      const error = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: error.message || "Failed to create reviews",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating reviews:", error);
    return {
      status: "error",
      message: "Network error while creating reviews",
      statusCode: 0
    };
  }
};

export const updateReviewsByOrder = async (
  reviews: ReviewUpdateInput[],
  orderId: string,
  token: { value: string },
) => {
  try {
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
      const error = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: error.message || "Failed to update reviews",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating reviews:", error);
    return {
      status: "error",
      message: "Network error while updating reviews",
      statusCode: 0
    };
  }
};

export const getWishlist = async (token: { value: string }) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/wishlist`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch wishlist",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return {
      status: "error",
      message: "Network error while fetching wishlist",
      statusCode: 0
    };
  }
};

export const addProductToWishlist = async (
  productId: string,
  token: { value: string },
) => {
  try {
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
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to add product to wishlist",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return {
      status: "error",
      message: "Network error while adding product to wishlist",
      statusCode: 0
    };
  }
};

export const getWishlistByShareCode = async (shareCode: string) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/wishlist/${shareCode}`,
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch wishlist",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getWishlistByShareCode:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching wishlist",
      statusCode: 0
    };
  }
};

export const removeProductFromWishlist = async (
  productId: string,
  token: { value: string },
) => {
  try {
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
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to remove product from wishlist",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    return {
      status: "error",
      message: "Network error while removing product from wishlist",
      statusCode: 0
    };
  }
};

export const addMultipleItemsToCart = async (
  items: { productId: string; variantId: string; quantity: number }[],
  token: { value: string },
) => {
  try {
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

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to add items to cart",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error adding multiple items to cart:", error);
    return {
      status: "error",
      message: "Network error while adding items to cart",
      statusCode: 0
    };
  }
};

export async function getFilterData(filters: Filter) {
  try {
    const query = new URLSearchParams(filters).toString();

    const response = await fetch(`${API_URL}/products/filters?${query}`);

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch filter data",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getFilterData:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching filter data",
      statusCode: 0
    };
  }
}

export async function getBestsellers() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/top-5-bestsellers`,
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch bestsellers",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getBestsellers:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching bestsellers",
      statusCode: 0
    };
  }
}

export async function clearCartItems(token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/cart/items`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: data.message || "Failed to clear cart items",
        statusCode: response.status
      };
    }

    return data;
  } catch (error) {
    console.error("Error clearing cart items:", error);
    return {
      status: "error",
      message: "Network error while clearing cart",
      statusCode: 0
    };
  }
}

export async function getDashboardStats(token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch dashboard stats",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      status: "error",
      message: "Network error while fetching dashboard stats",
      statusCode: 0
    };
  }
}

export async function getRecentOrders(token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/admin/dashboard/recent-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch recent orders",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return {
      status: "error",
      message: "Network error while fetching recent orders",
      statusCode: 0
    };
  }
}

export async function getCategories(token: { value: string }) {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch categories",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return { status: "success", data };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      status: "error",
      message: "Network error while fetching categories",
      statusCode: 0
    };
  }
}

export async function getCategoryBySlug(
  slug: string,
  token: { value: string },
) {
  try {
    const response = await fetch(`${API_URL}/categories/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        status: "error",
        message: errorData.message || "Failed to fetch category",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return { status: "success", data };
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    return {
      status: "error",
      message: "Network error while fetching category",
      statusCode: 0
    };
  }
}

export const getStockData = async (token: { value: string }) => {
  try {
    const response = await fetch(`${API_URL}/admin/products/stock`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch stock data",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getStockData:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching stock data",
      statusCode: 0
    };
  }
};

export const getProductsSummary = async (token: { value: string }) => {
  try {
    const response = await fetch(`${API_URL}/admin/products/summary`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch products summary",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getProductsSummary:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching products summary",
      statusCode: 0
    };
  }
};

export const getRecommendedProducts = async (productId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/products/cart-product-recommend/${productId}`,
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch recommended products",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getRecommendedProducts:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching recommended products",
      statusCode: 0
    };
  }
};

export const getSimilarProducts = async (productId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/products/similar-products/${productId}`,
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch similar products",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getSimilarProducts:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching similar products",
      statusCode: 0
    };
  }
};

export const getClientCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories/client`);

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch categories",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getClientCategories:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching categories",
      statusCode: 0
    };
  }
};

export const getCategorySummary = async (
  token: { value: string },
  slug: string,
) => {
  try {
    const response = await fetch(`${API_URL}/categories/slug/${slug}/summary`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch categories summary",
        statusCode: response.status
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in getCategorySummary:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching categories summary",
      statusCode: 0
    };
  }
};

export const addCategory = async (
  formData: FormData,
  token: { value: string },
) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to add category",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in addCategory:", error);
    return {
      status: "error",
      message: "Network error occurred while adding category",
      statusCode: 0
    };
  }
};

export const updateCategory = async (
  input: CategoryInput,
  token: { value: string },
  id: string,
) => {
  try {
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
      return {
        status: "error",
        message: "Failed to update category",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in updateCategory:", error);
    return {
      status: "error",
      message: "Network error occurred while updating category",
      statusCode: 0
    };
  }
};

export const createCategory = async (
  input: CategoryInput,
  token: { value: string },
) => {
  try {
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
      return {
        status: "error",
        message: "Failed to create category",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in createCategory:", error);
    return {
      status: "error",
      message: "Network error occurred while creating category",
      statusCode: 0
    };
  }
};

export const addProduct = async (
  product: ProductInput,
  token: { value: string },
) => {
  try {
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
      return {
        status: "error",
        message: "Failed to add product",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in addProduct:", error);
    return {
      status: "error",
      message: "Network error occurred while adding product",
      statusCode: 0
    };
  }
};

export const updateProduct = async (
  product: ProductInput,
  token: { value: string },
  id: string,
) => {
  try {
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
      return {
        status: "error",
        message: "Failed to update product",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in updateProduct:", error);
    return {
      status: "error",
      message: "Network error occurred while updating product",
      statusCode: 0
    };
  }
};

export const createShippingOrder = async (
  orderId: string,
  token: { value: string },
) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/shipping-order`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to create shipping order",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in createShippingOrder:", error);
    return {
      status: "error",
      message: "Network error occurred while creating shipping order",
      statusCode: 0
    };
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: string,
  adminNotes: string,
  token: { value: string },
) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: JSON.stringify({ status, adminNotes }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to update order status",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in updateOrderStatus:", error);
    return {
      status: "error",
      message: "Network error occurred while updating order status",
      statusCode: 0
    };
  }
};

export const refundOrder = async (
  orderId: string,
  token: { value: string },
) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/refund`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      return {
        status: "error",
        message: "Refund not successful",
        statusCode: response.status
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error in refundOrder:", error);
    return {
      status: "error",
      message: "Network error occurred while processing refund",
      statusCode: 0
    };
  }
};

export const downloadFile = async (url: string, token: { value: string }) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) {
      return {
        status: "error",
        message: "Failed to download file",
        statusCode: res.status
      };
    }

    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = url.includes("pdf") ? "order.pdf" : "order.xlsx";
    a.click();
    
    return { status: "success" };
  } catch (error) {
    console.error("Network error in downloadFile:", error);
    return {
      status: "error",
      message: "Network error occurred while downloading file",
      statusCode: 0
    };
  }
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
  try {
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
      console.error("Failed to fetch admin orders:", response.status);
      return {
        status: "error",
        message: "Failed to fetch orders",
        statusCode: response.status,
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching orders",
      statusCode: 0,
    };
  }
};

export const getOrderSummaryStats = async (authToken: string) => {
  try {
    const response = await fetch(`${API_URL}/admin/orders/summary`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch order summary stats:", response.status);
      return {
        status: "error",
        message: "Failed to fetch order summary stats",
        statusCode: response.status,
      };
    }
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order summary stats:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching order summary stats",
      statusCode: 0,
    };
  }
};

export const deleteProduct = async (id: string, token: { value: string }) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to delete product:", response.status);
      return {
        status: "error",
        message: "Failed to delete product",
        statusCode: response.status,
      };
    }

    return { status: "success", message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      status: "error",
      message: "Network error occurred while deleting product",
      statusCode: 0,
    };
  }
};

export const sendOrderViaEmail = async (orderId: string, authToken: string) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/send-email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to send order email:", response.status);
      return {
        status: "error",
        message: "Failed to send order email",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending order email:", error);
    return {
      status: "error",
      message: "Network error occurred while sending order email",
      statusCode: 0,
    };
  }
};

export const deleteCategory = async (id: string, authToken: string) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to delete category:", response.status);
      return {
        status: "error",
        message: "Failed to delete category",
        statusCode: response.status,
      };
    }

    return { status: "success", message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      status: "error",
      message: "Network error occurred while deleting category",
      statusCode: 0,
    };
  }
};

export const getDiscounts = async (authToken: string) => {
  try {
    const response = await fetch(`${API_URL}/discounts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch discounts:", response.status);
      return {
        status: "error",
        message: "Failed to fetch discounts",
        statusCode: response.status,
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching discounts:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching discounts",
      statusCode: 0,
    };
  }
};

export const addDiscount = async (input: DiscountInput, authToken: string) => {
  try {
    const response = await fetch(`${API_URL}/discounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.error("Failed to add discount:", response.status);
      return {
        status: "error",
        message: "Failed to add discount",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding discount:", error);
    return {
      status: "error",
      message: "Network error occurred while adding discount",
      statusCode: 0,
    };
  }
};

export const updateDiscount = async (
  id: string,
  input: DiscountInput,
  authToken: string,
) => {
  try {
    const response = await fetch(`${API_URL}/discounts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      console.error("Failed to update discount:", response.status);
      return {
        status: "error",
        message: "Failed to update discount",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating discount:", error);
    return {
      status: "error",
      message: "Network error occurred while updating discount",
      statusCode: 0,
    };
  }
};

export const deleteDiscount = async (id: string, authToken: string) => {
  try {
    const response = await fetch(`${API_URL}/discounts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to delete discount:", response.status);
      return {
        status: "error",
        message: "Failed to delete discount",
        statusCode: response.status,
      };
    }
    
    return { status: "success", message: "Discount deleted successfully" };
  } catch (error) {
    console.error("Error deleting discount:", error);
    return {
      status: "error",
      message: "Network error occurred while deleting discount",
      statusCode: 0,
    };
  }
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
  try {
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
      console.error("Failed to fetch users:", response.status);
      return {
        status: "error",
        message: "Failed to fetch users",
        statusCode: response.status,
      };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching users",
      statusCode: 0,
    };
  }
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
  try {
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
      console.error("Failed to fetch user analytics:", response.status);
      return {
        status: "error",
        message: "Failed to fetch user analytics",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching user analytics",
      statusCode: 0,
    };
  }
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
  try {
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
      console.error("Failed to fetch user order history:", response.status);
      return {
        status: "error",
        message: "Failed to fetch user order history",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user order history:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching user order history",
      statusCode: 0,
    };
  }
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
  try {
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
      console.error("Failed to update user status:", response.status);
      return {
        status: "error",
        message: "Failed to update user status",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      status: "error",
      message: "Network error occurred while updating user status",
      statusCode: 0,
    };
  }
};

// Get individual user by ID
export const getUserById = async (userId: string, authToken: string) => {
  try {
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
      console.error("Failed to fetch user:", response.status);
      return {
        status: "error",
        message: "Failed to fetch user",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching user",
      statusCode: 0,
    };
  }
};
<<<<<<< Updated upstream
=======

// FCM Token Registration
export const registerFcmToken = async (
  token: string,
  authToken: { value: string },
) => {
  try {
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
      console.error("Failed to register FCM token:", response.status);
      return {
        status: "error",
        message: "Failed to register FCM token",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering FCM token:", error);
    return {
      status: "error",
      message: "Network error occurred while registering FCM token",
      statusCode: 0,
    };
  }
};

// Delete FCM token
export const deleteFcmToken = async (
  token: string,
  authToken: { value: string },
) => {
  try {
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
      console.error("Failed to delete FCM token:", response.status);
      return {
        status: "error",
        message: "Failed to delete FCM token",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting FCM token:", error);
    return {
      status: "error",
      message: "Network error occurred while deleting FCM token",
      statusCode: 0,
    };
  }
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
  try {
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
      console.error("Failed to register notification token:", response.status);
      return {
        status: "error",
        message: "Failed to register notification token",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering notification token:", error);
    return {
      status: "error",
      message: "Network error occurred while registering notification token",
      statusCode: 0,
    };
  }
};

// Unregister FCM token
export const unregisterNotificationToken = async (
  token: string,
  authToken: { value: string },
) => {
  try {
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
      console.error("Failed to unregister notification token:", response.status);
      return {
        status: "error",
        message: "Failed to unregister notification token",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error unregistering notification token:", error);
    return {
      status: "error",
      message: "Network error occurred while unregistering notification token",
      statusCode: 0,
    };
  }
};

// Get user notifications
export const getUserNotifications = async (
  authToken: { value: string },
  page: number = 1,
  limit: number = 20,
  type?: string,
  isRead?: boolean,
) => {
  try {
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
      console.error("Failed to fetch notifications:", response.status);
      return {
        status: "error",
        message: "Failed to fetch notifications",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching notifications",
      statusCode: 0,
    };
  }
};

// Mark notification as read
export const markNotificationAsRead = async (
  notificationId: string,
  authToken: { value: string },
) => {
  try {
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
      console.error("Failed to mark notification as read:", response.status);
      return {
        status: "error",
        message: "Failed to mark notification as read",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      status: "error",
      message: "Network error occurred while marking notification as read",
      statusCode: 0,
    };
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (authToken: {
  value: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/notifications/user/mark-all-read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to mark all notifications as read:", response.status);
      return {
        status: "error",
        message: "Failed to mark all notifications as read",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return {
      status: "error",
      message: "Network error occurred while marking all notifications as read",
      statusCode: 0,
    };
  }
};

// Delete notification
export const deleteNotification = async (
  notificationId: string,
  authToken: { value: string },
) => {
  try {
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
      console.error("Failed to delete notification:", response.status);
      return {
        status: "error",
        message: "Failed to delete notification",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    return {
      status: "error",
      message: "Network error occurred while deleting notification",
      statusCode: 0,
    };
  }
};

// Delete all notifications
export const deleteAllNotifications = async (authToken: { value: string }) => {
  try {
    const response = await fetch(`${API_URL}/notifications/user/delete-all`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to delete all notifications:", response.status);
      return {
        status: "error",
        message: "Failed to delete all notifications",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    return {
      status: "error",
      message: "Network error occurred while deleting all notifications",
      statusCode: 0,
    };
  }
};

// =================
// Admin Notification APIs
// =================

// Get notification statistics (admin only)
export const getNotificationStats = async (authToken: { value: string }) => {
  try {
    const response = await fetch(`${API_URL}/notifications/stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch notification stats:", response.status);
      return {
        status: "error",
        message: "Failed to fetch notification stats",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notification stats:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching notification stats",
      statusCode: 0,
    };
  }
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
  try {
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
      console.error("Failed to fetch notification history:", response.status);
      return {
        status: "error",
        message: "Failed to fetch notification history",
        statusCode: response.status,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notification history:", error);
    return {
      status: "error",
      message: "Network error occurred while fetching notification history",
      statusCode: 0,
    };
  }
};

// Send promotional notification (admin only)
export const sendPromotionalNotification = async (
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
  targetUsers?: string[],
) => {
  try {
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
      console.error("Failed to send promotional notification:", response.status);
      return {
        status: "error",
        message: "Failed to send promotional notification",
        statusCode: response.status,
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending promotional notification:", error);
    return {
      status: "error",
      message: "Network error occurred while sending promotional notification",
      statusCode: 0,
    };
  }
};

// Send notification to specific user (admin only) - supports both userId and email
export const sendNotificationToUser = async (
  userIdentifier: string,
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
) => {
  try {
    // Determine if it's an email or userId
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userIdentifier);
    
    const response = await fetch(`${API_URL}/notifications/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.value}`,
      },
      body: JSON.stringify({
        ...(isEmail ? { email: userIdentifier } : { userId: userIdentifier }),
        payload: {
          title,
          body,
          data: notificationData,
        },
      }),
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to send notification:", response.status);
      return {
        status: "error",
        message: "Failed to send notification",
        statusCode: response.status,
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending notification:", error);
    return {
      status: "error",
      message: "Network error occurred while sending notification",
      statusCode: 0,
    };
  }
};

// Send notification to multiple users (admin only) - supports both userIds and emails
export const sendNotificationToMultipleUsers = async (
  userIdentifiers: string[],
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
) => {
  try {
    // Check if any of the identifiers are emails
    const hasEmails = userIdentifiers.some(id => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id));
    
    const response = await fetch(`${API_URL}/notifications/send-multiple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.value}`,
      },
      body: JSON.stringify({
        ...(hasEmails ? { emails: userIdentifiers } : { userIds: userIdentifiers }),
        title,
        body,
        data: notificationData,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to send notifications:", response.status);
      return {
        status: "error",
        message: "Failed to send notifications",
        statusCode: response.status,
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending notifications:", error);
    return {
      status: "error",
      message: "Network error occurred while sending notifications",
      statusCode: 0,
    };
  }
};

// Send notification to all users (admin only)
export const sendNotificationToAllUsers = async (
  title: string,
  body: string,
  authToken: { value: string },
  notificationData?: Record<string, string | number | boolean>,
) => {
  try {
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
      console.error("Failed to send notification to all users:", response.status);
      return {
        status: "error",
        message: "Failed to send notification to all users",
        statusCode: response.status,
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending notification to all users:", error);
    return {
      status: "error",
      message: "Network error occurred while sending notification to all users",
      statusCode: 0,
    };
  }
};
>>>>>>> Stashed changes
