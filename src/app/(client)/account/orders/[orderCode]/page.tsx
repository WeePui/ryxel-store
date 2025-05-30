import OrderDetailsClient from "@/app/_components/OrderDetails/OrderDetailsClient";
import { getOrderByOrderCode } from "@/app/_libs/apiServices";
import { cookies } from "next/headers";

interface Props {
  params: {
    orderCode: string;
  };
}

async function page({ params }: Props) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");
  const orderCode = params.orderCode;

  const { data } = await getOrderByOrderCode(orderCode, token!);
  const { order } = data;

  return <OrderDetailsClient order={order} />;
}

export default page;
