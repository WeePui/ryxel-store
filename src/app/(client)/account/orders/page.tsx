import UserOrderDashboard from "@/app/_components/Order/OrdersDashboard";
import OrderSearchBar from "@/app/_components/Order/OrderSearchBar";
import { getOrders } from "@/app/_libs/apiServices";
import { Metadata } from "next";
import { cookies } from "next/headers";
import AccountPage from "@/app/_components/Account/AccountPage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Orders",
  description: "Manage your order information.",
};

interface PageProps {
  searchParams: Promise<{
    search: string;
  }>;
}

export default async function page({ searchParams }: PageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");
  let { search } = await searchParams;
  if (!search) search = "";

  const { data } = await getOrders(token!, search);
  const { orders } = data;

  return (
    <AccountPage
      titleKey="account.orders.title"
      descriptionKey="account.orders.description"
      titleAction={<OrderSearchBar />}
    >
      <UserOrderDashboard orders={orders} />
    </AccountPage>
  );
}
