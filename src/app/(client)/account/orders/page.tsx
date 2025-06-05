import UserOrderDashboard from "@/app/_components/Order/OrdersDashboard";
import OrderSearchBar from "@/app/_components/Order/OrderSearchBar";
import { getOrders } from "@/app/_libs/apiServices";
import { Metadata } from "next";
import { cookies } from "next/headers";
import AccountPage from "@/app/_components/Account/AccountPage";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import { redirect } from "next/navigation";

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
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    // Check authentication
    if (!token) {
      redirect("/login?redirect=/account/orders");
    }

    let { search } = await searchParams;
    if (!search) search = "";

    const ordersResponse = await getOrders(token, search);

    // Handle API errors
    if (ordersResponse.status === "error") {
      return (
        <AccountPage
          titleKey="account.orders.title"
          descriptionKey="account.orders.description"
          titleAction={<OrderSearchBar />}
        >
          <ApiErrorDisplay
            error={{
              status: "error",
              message: ordersResponse.message || "Failed to load orders",
              statusCode: ordersResponse.statusCode || 500,
            }}
            title="Orders Loading Error"
            size="medium"
          />
        </AccountPage>
      );
    }

    // Validate response structure
    if (!ordersResponse.data || !ordersResponse.data.orders) {
      return (
        <AccountPage
          titleKey="account.orders.title"
          descriptionKey="account.orders.description"
          titleAction={<OrderSearchBar />}
        >
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Invalid orders data received",
              statusCode: 500,
            }}
            title="Orders Data Error"
            size="medium"
          />
        </AccountPage>
      );
    }

    const { orders } = ordersResponse.data;

    return (
      <AccountPage
        titleKey="account.orders.title"
        descriptionKey="account.orders.description"
        titleAction={<OrderSearchBar />}
      >
        <UserOrderDashboard orders={orders} />
      </AccountPage>
    );
  } catch (error) {
    console.error("Orders page: Unexpected error occurred:", error);

    return (
      <AccountPage
        titleKey="account.orders.title"
        descriptionKey="account.orders.description"
        titleAction={<OrderSearchBar />}
      >
        <ApiErrorDisplay
          error={{
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "An unexpected error occurred",
            statusCode: 500,
          }}
          title="Orders Page Error"
          size="medium"
        />
      </AccountPage>
    );
  }
}
