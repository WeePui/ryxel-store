import OrderAdress from '@/app/_components/Admin/Orders/OrderAdress';
import OrderCustomer from '@/app/_components/Admin/Orders/OrderCustomer';
import OrderPayment from '@/app/_components/Admin/Orders/OrderPayment';
import OrderStatus from '@/app/_components/Admin/Orders/OrderStatus';
import TrackingOrderStatus from '@/app/_components/Admin/Orders/TrackingOrderStatus';
import OrderAction from '@/app/_components/Order/OrderAction';
import OrderDetailsLineItems from '@/app/_components/OrderDetails/OrderDetailsLineItems';
import OrderDetailsSummary from '@/app/_components/OrderDetails/OrderDetailsSummary';
import Card from '@/app/_components/UI/Card';
import { getTintedColor } from '@/app/_helpers/getTintedColor';
import { getOrderByOrderCode } from '@/app/_libs/apiServices';
import { LineItem } from '@/app/_types/lineItem';
import { mappingOrderStatus } from '@/app/_utils/mappingOrderStatus';
import { cookies } from 'next/headers';

interface OrderCodePageProps {
  params: Promise<{
    orderCode: string;
  }>;
}

export default async function page({ params }: OrderCodePageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    throw new Error('Chưa đăng nhập');
  }

  const { orderCode } = await params;
  const { data: orderData } = await getOrderByOrderCode(orderCode, token!);
  const { order } = orderData;

  const orderStatus = mappingOrderStatus(order.status);
  const refundable = order.status !== 'refunded';

  return (
    <div className="grid grid-cols-[75fr_25fr] xl:grid-cols-[70fr_30fr] lg:grid-cols-1 p-6 gap-6 sm:p-2">
      <div className="col-span-full px-4 sm:px-0 flex gap-8 md:gap-6 sm:gap-2 flex-wrap items-center">
        <h1 className="text-2xl font-title text-primary-600">
          Mã đơn hàng: {order.orderCode}
        </h1>
        <div
          className="py-1 px-3 rounded-full text-xs font-semibold flex items-center justify-center"
          style={{
            backgroundColor: getTintedColor(orderStatus.color),
          }}
        >
          <span style={{ color: orderStatus.color }}>{orderStatus.text}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-2">
        <div className="sm:col-span-full row-span-2">
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
        {<TrackingOrderStatus order={order} />}
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
}
