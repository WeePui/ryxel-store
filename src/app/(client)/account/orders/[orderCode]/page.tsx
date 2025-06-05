import OrderDetailsClient from "@/app/_components/OrderDetails/OrderDetailsClient";
import { getOrderByOrderCode } from "@/app/_libs/apiServices";
import { cookies } from "next/headers";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    orderCode: string;
  }>;
}

async function page({ params }: Props) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    // Check authentication
    if (!token) {
      redirect("/login?redirect=/account/orders");
    }

    const { orderCode } = await params;

    // Validate orderCode parameter
    if (!orderCode || typeof orderCode !== "string") {
      return (
        <div className="container mx-auto p-6">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Invalid order code provided",
              statusCode: 400,
            }}
            title="Order Details Error"
            size="large"
          />
        </div>
      );
    }

    const orderResponse = await getOrderByOrderCode(orderCode, token);

    // Handle API errors
    if (orderResponse.status === "error") {
      return (
        <div className="container mx-auto p-6">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: orderResponse.message || "Failed to load order details",
              statusCode: orderResponse.statusCode || 500,
            }}
            title="Order Details Loading Error"
            size="large"
          />
        </div>
      );
    }

    // Validate response structure
    if (!orderResponse.data || !orderResponse.data.order) {
      return (
        <div className="container mx-auto p-6">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Order not found or invalid order data",
              statusCode: 404,
            }}
            title="Order Not Found"
            size="large"
          />
        </div>
      );
    }

    const { order } = orderResponse.data;

    return <OrderDetailsClient order={order} />;
  } catch (error) {
    console.error("Order details page: Unexpected error occurred:", error);

    return (
      <div className="container mx-auto p-6">
        <ApiErrorDisplay
          error={{
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred while loading order details",
            statusCode: 500,
          }}
          title="Order Details Error"
          size="large"
        />
      </div>
    );
  }
}

export default page;
