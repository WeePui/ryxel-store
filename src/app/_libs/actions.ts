"use server";

import {
  validateAddressForm,
  validateCategoryForm,
  validateDiscountForm,
  validateLoginForm,
  validateSignupForm,
  validateUpdatePasswordForm,
  validateUpdateProfileForm,
} from "@helpers/validator";
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
  sendOrderViaEmail,
  deleteCategory,
  addDiscount,
  updateDiscount,
  deleteDiscount,
  deleteFcmToken,
  registerNotificationToken,
  unregisterNotificationToken,
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  deleteAllNotifications,
  getNotificationStats,
  getNotificationHistory,
  sendPromotionalNotification,
  sendNotificationToUser,
  sendNotificationToMultipleUsers,
  sendNotificationToAllUsers,
} from "@libs/apiServices";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  UpdatePasswordInput,
  AddressSelectInput,
  SignupInput,
  UpdateProfileInput,
  ReviewInput,
  ReviewUpdateInput,
  CategoryInput,
  ProductInput,
  DiscountInput,
} from "../_types/validateInput";
import { transformAddressFormData } from "../_helpers/transformAddressFormData";
import { FormError } from "../_types/formError";
import { Wishlist } from "../_types/wishlist";

async function checkLogin() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return {
      success: false,
      errors: {
        message: "No token found. Please log in again.",
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
  formData: FormData,
): Promise<{
  success: boolean;
  inputData?: { email: string; password: string };
  errors?: FormError;
} | void> {
  const userInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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
      Number(process.env.JWT_COOKIES_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
  );

  cookiesStore.set("jwt", loginData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
  cookiesStore.set("verified", user.emailVerified, {
    httpOnly: true,
    secure: true,
  });
  cookiesStore.delete("reauthenticated");

  redirect(user.role !== "admin" ? "/products" : "/admin/dashboard");
}

export async function signupAction(
  _: unknown,
  formData: FormData,
): Promise<{
  success: boolean;
  inputData?: SignupInput;
  errors?: FormError;
} | void> {
  const input: SignupInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    passwordConfirm: formData.get("passwordConfirm") as string,
    name: formData.get("name") as string,
    gender: formData.get("gender") as string,
    dob: formData.get("dob") as string,
    terms: formData.get("terms") === "true",
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
      Number(process.env.JWT_COOKIES_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
  );
  cookiesStore.set("jwt", signupData.token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  await sendOTPAction({ counter: 0 });

  redirect("/signup/verifyEmail");
}

export const sendOTPAction = async ({
  counter,
}: {
  counter: number;
  success?: true;
}) => {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await sendOTP(token);
    if (response.status === "success") {
      return { counter: counter + 1, success: true };
    }

    throw new Error(response.message || "Failed to send OTP.");
  } catch (error) {
    return {
      counter: counter,
      errors: {
        message: (error as Error).message || "An unknown error occurred.",
      },
    };
  }
};

export async function verifyOTPAction(_: unknown, formData: FormData) {
  const { otp } = Object.fromEntries(formData);

  if (!otp) {
    return {
      errors: {
        message: "OTP is required",
      },
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const data = await verifyOTP(otp as string, token);
  if (data.status !== "success") {
    const cookiesStore = await cookies();
    cookiesStore.set("verified", "true", {
      httpOnly: true,
      secure: true,
    });

    return {
      errors: {
        message: data.message,
      },
    };
  }

  redirect("/account");
}

export async function logoutAction(
  _: unknown,
  formData: FormData,
): Promise<{ success: boolean; errors?: FormError }> {
  console.log("Logging out...");

  const checkIsLogin = await checkLogin();

  // Try to clean up FCM token before logout
  if (checkIsLogin.success) {
    const token = checkIsLogin.token!;
    const fcmToken = formData.get("fcmToken") as string;

    if (fcmToken) {
      try {
        await deleteFcmToken(fcmToken, token);
      } catch (error) {
        // Don't fail logout if FCM cleanup fails, just log the error
        console.error("Failed to cleanup FCM token during logout:", error);
      }
    }
  }

  const data = await logout();

  if (data.status !== "success") {
    return {
      success: false,
      errors: {
        message: data.message,
      },
    };
  }

  const cookiesStore = await cookies();
  cookiesStore.delete("jwt");
  cookiesStore.delete("reauthenticated");

  redirect("/");
}

export async function forgotPasswordAction(
  _: unknown,
  formData: FormData,
): Promise<{ success: boolean; errors: FormError }> {
  const { email } = Object.fromEntries(formData);

  if (!email) {
    return {
      success: false,
      errors: {
        message: "E-mail address is required",
      },
    };
  }

  try {
    const data = await forgotPassword(email as string);
    if (data.status === "success") {
      return {
        success: true,
        errors: {},
      };
    } else throw new Error(data.message || "Failed to send reset token.");
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
  formData: FormData,
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
        password: "Password and password confirm are required",
      },
    };
  }

  if (password !== passwordConfirm) {
    return {
      success: false,
      errors: {
        password: "Password and password confirm do not match",
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
      resetToken as string,
    );
    if (data.status === "success") redirect("/account");
    else
      return {
        success: false,
        errors: { message: data.message || "Failed to reset password." },
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
  formData: FormData,
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
  if (response.status === "success") {
    revalidatePath("/account");

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
  formData: FormData,
): Promise<{ success: boolean; errors: FormError }> {
  const input: UpdatePasswordInput = {
    passwordCurrent: formData.get("passwordCurrent") as string,
    password: formData.get("password") as string,
    passwordConfirm: formData.get("passwordConfirm") as string,
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
  if (response.status === "success") {
    const cookiesStore = await cookies();
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.JWT_COOKIES_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
    );
    cookiesStore.set("jwt", response.token, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
    });

    cookiesStore.delete("reauthenticated");

    revalidatePath("/account");
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
  formData: FormData,
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
  if (response.status === "success") {
    revalidatePath("/account/addresses");
    revalidatePath("/checkout");
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
    revalidatePath("/account/addresses");
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
  formData: FormData,
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

  const response = await updateAddress(addressId, addressData, token);

  if (response.status === "success") {
    revalidatePath("/account/addresses");
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
  const token = cookiesStore.get("jwt");

  if (!token) {
    return {
      errors: {
        message: "No token found. Please log in again.",
      },
    };
  }

  const response = await setDefaultAddress(addressId, token);
  if (response.status === "success") {
    revalidatePath("/account/addresses");
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
  quantity: number,
) {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return {
      success: false,
      errors: {
        user: "Please login to continue",
      },
    };

  const token = checkIsLogin.token!;

  const response = await addOrUpdateCartItem(
    productId,
    variantId,
    quantity,
    token,
  );
  if (response.status === "success") {
    revalidatePath("/cart");
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
  variantId: string,
) {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await removeCartItem(productId, variantId, token);
  if (response.status === "success") {
    revalidatePath("/cart");
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
  formData: FormData,
): Promise<{
  success: boolean;
  code?: string;
  discountAmount?: number;
  errors: FormError;
}> {
  const code = formData.get("code") as string;
  const lineItems = JSON.parse(formData.get("lineItems") as string);

  if (!code) {
    return {
      success: false,
      errors: {
        code: "Discount code is required",
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
        message: "Your voucher is not valid or has expired",
      },
    };
  }
}

export async function reauthenticateAction(
  redirectUrl: string,
  _: unknown,
  formData: FormData,
) {
  const data = Object.fromEntries(formData);
  const decodedUrl = decodeURIComponent(redirectUrl);

  if (!data.password) {
    return {
      errors: {
        password: "Password is required",
      },
    };
  }

  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const cookiesStore = await cookies();
  const response = await reauthenticate(data.password as string, token);

  if (response.status === "success") {
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.REAUTHENTICATED_COOKIES_EXPIRES_IN!) * 30 * 1000,
    );
    cookiesStore.set("reauthenticated", "true", {
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
  formData: FormData,
) {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };
  const token = checkIsLogin.token!;

  const data = {
    code: formData.get("code") as string,
    address: formData.get("address") as string,
    paymentMethod: formData.get("paymentMethod") as string,
    lineItems: JSON.parse(formData.get("lineItems") as string),
    processPayment: formData.get("processPayment") as string,
    orderCode: formData.get("orderCode") as string,
  };

  if (!data.address) {
    return {
      errors: {
        message: "Address is required",
      },
    };
  }

  if (!data.paymentMethod) {
    return {
      errors: {
        message: "Payment method is required",
      },
    };
  }

  if (!data.lineItems.length) {
    return {
      errors: {
        message: "Line items are required",
      },
    };
  }

  let checkoutOrder;

  if (data.processPayment === "1") {
    if (!data.orderCode) {
      return {
        errors: {
          message: "Order code is required",
        },
      };
    }

    const response = await getOrderByOrderCode(data.orderCode, token);

    if (response.status !== "success") {
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

    if (createOrderResponse.status !== "success") {
      if (
        createOrderResponse.message ===
        "You have an unpaid order. Please complete the payment"
      ) {
        redirect("/cart?error=unpaidOrder");
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

  if (checkoutOrder.paymentMethod === "cod") {
    redirect(`/account/orders/${checkoutOrder.orderCode}`);
  }

  if (checkoutOrder.paymentMethod === "stripe") {
    const response = await createCheckoutSession(
      checkoutOrder,
      checkIsLogin.token!,
      "Stripe",
    );

    if (response.status === "success") {
      redirect(response.session.url);
    } else {
      return {
        errors: {
          message: response.message,
        },
      };
    }
  } else if (checkoutOrder.paymentMethod === "zalopay") {
    const response = await createCheckoutSession(
      checkoutOrder,
      checkIsLogin.token!,
      "ZaloPay",
    );

    if (response.status === "success") {
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

  if (response.status === "success") {
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
  reviews: ReviewInput[],
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await createReviewsByOrder(reviews, orderId, token);

  if (response.status === "success") {
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
  reviews: ReviewUpdateInput[],
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success)
    return checkIsLogin as { success: boolean; errors: FormError };

  const token = checkIsLogin.token!;

  const response = await updateReviewsByOrder(reviews, orderId, token);

  if (response.status === "success") {
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

  if (response.status === "success") {
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

  if (response.status === "success") {
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

  if (response.status === "success") {
    revalidatePath("/wishlist");
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

  if (response.status === "success") {
    revalidatePath("/wishlist");
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
  items: { product: string; variant: string; quantity: number }[],
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

  if (response.status === "success") {
    revalidatePath("/cart");
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
  items: { product: string; variant: string }[],
) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return {
      success: false,
      errors: {
        message: "No token found. Please log in again.",
      },
    };
  }
  const selectedItems = items.map((item) => {
    return {
      product: item.product,
      variant: item.variant,
    };
  });

  cookiesStore.set("selectedCartItems", JSON.stringify(selectedItems), {
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

  if (response.status === "success") {
    const cookiesStore = await cookies();
    cookiesStore.delete("selectedCartItems");

    revalidatePath("/cart");
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
  formData: FormData,
): Promise<{
  success: boolean | undefined;
  errors: FormError;
  input: CategoryInput;
  slug?: string;
}> => {
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    slug: formData.get("slug") as string,
    image: formData.get("image") as File | null | string,
    id: formData.get("id") as string,
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
  if (!checkIsLogin.success)
    return { ...checkIsLogin, input: data } as {
      success: boolean;
      errors: FormError;
      input: CategoryInput;
    };

  const token = checkIsLogin.token!;

  const response = await updateCategory(data, token, data.id!);

  if (response.status !== "success") {
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
    errors: {},
  };
};

export const addCategoryAction = async (
  _: unknown,
  formData: FormData,
): Promise<{
  success: boolean | undefined;
  errors?: FormError;
  input: CategoryInput;
  slug?: string;
}> => {
  const data = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    slug: formData.get("slug") as string,
    image: formData.get("image") as File | null | string,
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

  if (response.status !== "success") {
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
  if (response.status === "success") {
    revalidatePath("/admin/products");
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
  productId: string,
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await updateProduct(product, token, productId);
  if (response.status === "success") {
    revalidatePath("/admin/products");
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
  orderCode: string,
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await createShippingOrder(orderId, token);
  if (response.status === "success") {
    revalidatePath("/admin/orders/" + orderCode);
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
  orderCode: string,
) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await updateOrderStatus(orderId, status, adminNotes, token);
  if (response.status === "success") {
    revalidatePath("/admin/orders/" + orderCode);
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
  if (response.status === "success") {
    revalidatePath("/admin/orders/" + orderCode);
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
  if (response.status === "success") {
    revalidatePath("/admin/products");
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

export const sendOrderViaEmailAction = async (orderId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await sendOrderViaEmail(orderId, token.value);
  if (response.status === "success") {
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

export const deleteCategoryAction = async (categoryId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await deleteCategory(categoryId, token.value);
  if (response.status === "success") {
    revalidatePath("/admin/categories");
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

export async function createDiscountAction(
  prevState: { success?: boolean; errors?: FormError; input: DiscountInput },
  formData: FormData,
): Promise<{ success?: boolean; errors?: FormError; input: DiscountInput }> {
  try {
    const code = formData.get("code")?.toString().toUpperCase() || "";
    const name = formData.get("name")?.toString() || "";
    const startDate = formData.get("startDate")?.toString() || "";
    const endDate = formData.get("endDate")?.toString() || "";
    const maxUse = parseInt(formData.get("maxUse")?.toString() || "0");
    const minOrderValue = parseInt(
      formData.get("minOrderValue")?.toString() || "0",
    );
    const discountPercentage = parseInt(
      formData.get("discountPercentage")?.toString() || "0",
    );
    const discountMaxValue = parseInt(
      formData.get("discountMaxValue")?.toString() || "0",
    );
    const maxUsePerUser = parseInt(
      formData.get("maxUsePerUser")?.toString() || "0",
    );
    const isActive = formData.get("isActive") === "on";

    const discountData: DiscountInput = {
      code,
      name,
      startDate,
      endDate,
      maxUse,
      minOrderValue,
      discountPercentage,
      discountMaxValue,
      maxUsePerUser,
      isActive,
    };

    // Sử dụng validator
    const validation = validateDiscountForm(discountData);

    if (!validation.success) {
      return {
        ...prevState,
        errors: validation.errors,
        input: discountData,
      };
    }

    // Gọi API để tạo discount
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return { ...checkIsLogin, input: discountData };

    const token = checkIsLogin.token!;

    const response = await addDiscount(discountData, token.value);

    if (response.status !== "success") {
      return {
        ...prevState,
        errors: {
          message: response.message,
        },
        input: discountData,
      };
    }

    revalidatePath("/admin/vouchers");

    return {
      ...prevState,
      success: true,
      input: discountData,
    };
  } catch (error) {
    console.error("Error creating discount:", error);

    return {
      ...prevState,
      errors: { message: "Có lỗi xảy ra khi tạo mã giảm giá" },
      input: prevState.input,
    };
  }
}

export const updateDiscountAction = async (
  prevState: { success?: boolean; errors?: FormError; input: DiscountInput },
  formData: FormData,
): Promise<{
  success?: boolean;
  errors?: FormError;
  input: DiscountInput;
}> => {
  try {
    const id = formData.get("id")?.toString() || "";
    const code = (
      formData.get("code")?.toString() ||
      prevState.input.code ||
      ""
    ).toUpperCase();
    const name = formData.get("name")?.toString() || "";
    const startDate = formData.get("startDate")?.toString() || "";
    const endDate = formData.get("endDate")?.toString() || "";
    const maxUse = parseInt(formData.get("maxUse")?.toString() || "0");
    const minOrderValue = parseInt(
      formData.get("minOrderValue")?.toString() || "0",
    );
    const discountPercentage = parseInt(
      formData.get("discountPercentage")?.toString() || "0",
    );
    const discountMaxValue = parseInt(
      formData.get("discountMaxValue")?.toString() || "0",
    );
    const maxUsePerUser = parseInt(
      formData.get("maxUsePerUser")?.toString() || "0",
    );
    const isActive = formData.get("isActive") === "on";

    const discountData: DiscountInput = {
      code,
      name,
      startDate,
      endDate,
      maxUse,
      minOrderValue,
      discountPercentage,
      discountMaxValue,
      maxUsePerUser,
      isActive,
    };

    // Sử dụng validator - khi update không cần validate code
    // (hoặc có thể kiểm tra nhẹ hơn vì code không thay đổi được)
    const validation = validateDiscountForm(discountData);

    if (!validation.success) {
      return {
        ...prevState,
        errors: validation.errors,
        input: discountData,
      };
    }

    // Gọi API để cập nhật discount
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return { ...checkIsLogin, input: discountData };

    const token = checkIsLogin.token!;

    const response = await updateDiscount(id, discountData, token.value);

    if (response.status !== "success") {
      return {
        ...prevState,
        errors: {
          message: response.message,
        },
        input: discountData,
      };
    }

    revalidatePath("/admin/vouchers");

    return {
      ...prevState,
      success: true,
      input: discountData,
    };
  } catch (error) {
    console.error("Error updating discount:", error);

    return {
      ...prevState,
      errors: { message: "Có lỗi xảy ra khi cập nhật mã giảm giá" },
      input: prevState.input,
    };
  }
};

export const deleteDiscountAction = async (discountId: string) => {
  const checkIsLogin = await checkLogin();
  if (!checkIsLogin.success) return checkIsLogin;

  const token = checkIsLogin.token!;
  const response = await deleteDiscount(discountId, token.value);
  if (response.status === "success") {
    revalidatePath("/admin/vouchers");
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

// ===== NOTIFICATION MANAGEMENT ACTIONS =====

export const registerNotificationTokenAction = async (
  token: string,
  platform: string,
  deviceInfo: string,
) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await registerNotificationToken(
      token,
      platform,
      deviceInfo,
      authToken,
    );

    if (response.status === "success") {
      return {
        success: true,
        message: "Notification token registered successfully",
      };
    } else {
      return {
        success: false,
        errors: {
          message: response.error || "Failed to register notification token",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const unregisterNotificationTokenAction = async (token: string) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await unregisterNotificationToken(token, authToken);

    if (response.status === "success") {
      return {
        success: true,
        message: "Notification token unregistered successfully",
      };
    } else {
      return {
        success: false,
        errors: {
          message: response.error || "Failed to unregister notification token",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

// ===== ADMIN NOTIFICATION ACTIONS =====

export const getNotificationStatsAction = async () => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await getNotificationStats(authToken);

    if (response.status === "success") {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: {
          message: response.error || "Failed to fetch notification statistics",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const getNotificationHistoryAction = async (
  page?: number,
  limit?: number,
  type?: string,
  startDate?: string,
  endDate?: string,
) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await getNotificationHistory(
      authToken,
      page,
      limit,
      type,
      startDate,
      endDate,
    );

    if (response.status === "success") {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: {
          message: response.error || "Failed to fetch notification history",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const sendPromotionalNotificationAction = async (
  title: string,
  body: string,
  data?: Record<string, string | number | boolean>,
  targetUsers?: string[],
) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await sendPromotionalNotification(
      title,
      body,
      authToken,
      data,
      targetUsers,
    );

    if (response.status === "success") {
      revalidatePath("/admin/notifications");
      return {
        success: true,
        message: "Promotional notification sent successfully",
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: {
          message: response.error || "Failed to send promotional notification",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const sendNotificationToUserAction = async (
  userIdentifier: string,
  title: string,
  body: string,
  data?: Record<string, string | number | boolean>,
) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await sendNotificationToUser(
      userIdentifier,
      title,
      body,
      authToken,
      data,
    );

    if (response.status === "success") {
      revalidatePath("/admin/notifications");
      return {
        success: true,
        message: "Notification sent to user successfully",
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: {
          message: response.error || "Failed to send notification to user",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const sendNotificationToMultipleUsersAction = async (
  userIdentifiers: string[],
  title: string,
  body: string,
  data?: Record<string, string | number | boolean>,
) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await sendNotificationToMultipleUsers(
      userIdentifiers,
      title,
      body,
      authToken,
      data,
    );

    if (response.status === "success") {
      revalidatePath("/admin/notifications");
      return {
        success: true,
        message: "Notifications sent to multiple users successfully",
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: {
          message:
            response.error || "Failed to send notifications to multiple users",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

export const sendNotificationToAllUsersAction = async (
  title: string,
  body: string,
  data?: Record<string, string | number | boolean>,
) => {
  try {
    const checkIsLogin = await checkLogin();
    if (!checkIsLogin.success) return checkIsLogin;

    const authToken = { value: checkIsLogin.token!.value };
    const response = await sendNotificationToAllUsers(
      title,
      body,
      authToken,
      data,
    );

    if (response.status === "success") {
      revalidatePath("/admin/notifications");
      return {
        success: true,
        message: "Notifications sent to all users successfully",
        data: response.data,
      };
    } else {
      return {
        success: false,
        errors: {
          message:
            response.error || "Failed to send notifications to all users",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        message: (error as Error).message,
      },
    };
  }
};

// User Notification Actions
export async function getUserNotificationsAction(
  page: number = 1,
  limit: number = 10,
  isRead?: boolean,
) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      return {
        success: false,
        errors: { message: "Authentication required" },
      };
    }

    const response = await getUserNotifications(
      token,
      page,
      limit,
      undefined,
      isRead,
    );
    return {
      success: true,
      data: response,
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

export async function markNotificationAsReadAction(notificationId: string) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      return {
        success: false,
        errors: { message: "Authentication required" },
      };
    }

    const response = await markNotificationAsRead(notificationId, token);
    revalidatePath("/notifications");
    return {
      success: true,
      data: response,
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

export async function markAllNotificationsAsReadAction() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      return {
        success: false,
        errors: { message: "Authentication required" },
      };
    }

    const response = await markAllNotificationsAsRead(token);
    revalidatePath("/notifications");
    return {
      success: true,
      data: response,
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

export async function deleteNotificationAction(notificationId: string) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      return {
        success: false,
        errors: { message: "Authentication required" },
      };
    }

    const response = await deleteNotification(notificationId, token);
    revalidatePath("/notifications");
    return {
      success: true,
      data: response,
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

export async function deleteAllNotificationsAction() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      return {
        success: false,
        errors: { message: "Authentication required" },
      };
    }

    const response = await deleteAllNotifications(token);
    revalidatePath("/notifications");
    return {
      success: true,
      data: response,
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
