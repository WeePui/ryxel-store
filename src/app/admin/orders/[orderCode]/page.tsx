import OrderAdress from "@/app/_components/Admin/Orders/OrderAdress";
import OrderCustomer from "@/app/_components/Admin/Orders/OrderCustomer";
import OrderPayment from "@/app/_components/Admin/Orders/OrderPayment";
import OrderStatus from "@/app/_components/Admin/Orders/OrderStatus";
import TrackingOrderStatus from "@/app/_components/Admin/Orders/TrackingOrderStatus";
import OrderAction from "@/app/_components/Admin/Orders/OrderAction";
import OrderDetailsLineItems from "@/app/_components/OrderDetails/OrderDetailsLineItems";
import OrderDetailsSummary from "@/app/_components/OrderDetails/OrderDetailsSummary";
import Card from "@/app/_components/UI/Card";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import { getTintedColor } from "@/app/_helpers/getTintedColor";
import { getOrderByOrderCode } from "@/app/_libs/apiServices";
import { LineItem } from "@/app/_types/lineItem";
import { mappingOrderStatus } from "@/app/_utils/mappingOrderStatus";
import { cookies } from "next/headers";

interface OrderCodePageProps {
  params: Promise<{
    orderCode: string;
  }>;
}

export default async function page({ params }: OrderCodePageProps) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    if (!token) {
      return (
        <div className="flex h-screen items-center justify-center">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Authentication required. Please log in to continue.",
              statusCode: 401,
            }}
            title="Authentication Required"
          />
        </div>
      );
    }

    const { orderCode } = await params;
    
    // Validate orderCode parameter
    if (!orderCode || typeof orderCode !== "string") {
      return (
        <div className="flex h-screen items-center justify-center">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Invalid order code provided",
              statusCode: 400,
            }}
            title="Invalid Order Code"
          />
        </div>
      );
    }

    const orderResponse = await getOrderByOrderCode(orderCode, token);

    if (orderResponse.status === "error") {
      return (
        <div className="flex h-screen items-center justify-center">
          <ApiErrorDisplay error={orderResponse} title="Order Error" />
        </div>
      );
    }

    // Validate response structure
    if (!orderResponse.data || !orderResponse.data.order) {
      return (
        <div className="flex h-screen items-center justify-center">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Order data is not available",
              statusCode: 404,
            }}
            title="Order Not Found"
          />
        </div>
      );
    }

    const { data: orderData } = orderResponse;
    const { order } = orderData;

    // Additional safety checks for order data
    if (!order || !order.orderCode || !order.status) {
      return (
        <div className="flex h-screen items-center justify-center">
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Order data is incomplete or corrupted",
              statusCode: 500,
            }}
            title="Data Error"
          />
        </div>
      );
    }

    const orderStatus = mappingOrderStatus(order.status);
    const refundable = order.status !== "refunded";

    return (
      <div className="grid grid-cols-[75fr_25fr] gap-6 p-6 xl:grid-cols-[70fr_30fr] lg:grid-cols-1 sm:p-2">
        <div className="col-span-full flex flex-wrap items-center gap-8 px-4 md:gap-6 sm:gap-2 sm:px-0">
          <h1 className="font-title text-2xl text-primary-600">
            Mã đơn hàng: {order.orderCode}
          </h1>
          <div
            className="flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: getTintedColor(orderStatus.color),
            }}
          >
            <span style={{ color: orderStatus.color }}>{orderStatus.text}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:gap-2">
          <div className="row-span-2 sm:col-span-full">
            <Card title="Sản phẩm">
              <div className="mt-6">
                <OrderDetailsLineItems
                  lineItems={order.lineItems as LineItem[]}
                  showTitle={false}
                />
                <OrderDetailsSummary order={order} />
              </div>
            </Card>
          </div>
          <TrackingOrderStatus order={order} />
          <OrderAction order={order} authToken={token?.value} />
        </div>
        <div className="flex flex-col gap-4 sm:gap-2">
          <div>
            <OrderStatus
              currentStatus={order.status}
              orderCode={order.orderCode}
              currentAdminNotes={order.adminNotes}
              orderId={order._id}
            />
          </div>
          <div className="col-span-1">
            <OrderCustomer user={order.user} />
          </div>
          <div className="col-span-1">
            <OrderAdress shippingAddress={order.shippingAddress} />
          </div>
          <div>
            <OrderPayment
              paymentMethod={order.paymentMethod}
              checkout={order.checkout ? order.checkout : undefined}
              refundable={refundable}
              orderId={order._id}
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Admin Order Page Error:", error);
    
    return (
      <div className="flex h-screen items-center justify-center">
        <ApiErrorDisplay
          error={{
            status: "error",
            message: "An unexpected error occurred while loading the order. Please try again.",
            statusCode: 500,
          }}
          title="Server Error"
        />
      </div>
    );
  }
}
