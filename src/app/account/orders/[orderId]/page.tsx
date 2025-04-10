import OrderDetailsAddress from '@/app/_components/OrderDetails/OrderDetailsAddress';
import OrderDetailsCTA from '@/app/_components/OrderDetails/OrderDetailsCTA';
import OrderDetailsLineItems from '@/app/_components/OrderDetails/OrderDetailsLineItems';
import OrderDetailsSummary from '@/app/_components/OrderDetails/OrderDetailsSummary';
import NavLink from '@/app/_components/UI/NavLink';
import { getOrderById } from '@/app/_libs/apiServices';
import { mappingOrderStatus } from '@/app/_utils/mappingOrderStatus';
import { cookies } from 'next/headers';
import { FaArrowLeft } from 'react-icons/fa6';

interface Props {
  params: {
    orderId: string;
  };
}

async function page({ params }: Props) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  const orderId = params.orderId;

  const { data } = await getOrderById(orderId, token!);
  const { order } = data;

  const orderStatus = mappingOrderStatus(order.status);

  return (
    <div className="flex h-full flex-col bg-white px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <NavLink href="/account/orders" type="secondaryNavInline">
            <span className="flex items-center">
              <FaArrowLeft className="mr-2" />
              Quay lại
            </span>
          </NavLink>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold mb-2">Chi tiết đơn hàng</h1>
          <div className="divide-x-2 divide-gray-200 flex items-center gap-2 text-sm">
            <span className=" text-grey-400">#{orderId}</span>
            <span
              className={`${orderStatus.textColor} font-semibold uppercase pl-2`}
            >
              {orderStatus.text}
            </span>
          </div>
        </div>
      </div>
      <hr className="border-t-1 my-4 border-grey-100" />
      <div className="flex flex-col gap-6">
        <OrderDetailsAddress address={order.shippingAddress} />
        <div className="rounded-lg overflow-hidden mb-4">
          <OrderDetailsLineItems lineItems={order.lineItems} />
          <OrderDetailsSummary order={order} />
        </div>
        <div className="ml-auto">
          <OrderDetailsCTA order={order} showDetailsButton={false} />
        </div>
      </div>
    </div>
  );
}

export default page;
