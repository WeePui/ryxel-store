import AddAddress from "@/app/_components/Address/AddAddress";
import Spinner from "@/app/_components/UI/Spinner";
import { Suspense } from "react";
import AccountPage from "@/app/_components/Account/AccountPage";
import { SafeAddressesList } from "@/app/_components/UI/ClientErrorBoundaryWrappers";
import { cookies } from "next/headers";
import { getAddresses } from "@/app/_libs/apiServices";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import { redirect } from "next/navigation";

async function Page() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("jwt");

    // Check authentication
    if (!token) {
      redirect("/login?redirect=/account/addresses");
    }

    const addressesResponse = await getAddresses(token);

    // Handle API errors
    if (addressesResponse.status === "error") {
      return (
        <AccountPage
          titleKey="account.addresses.title"
          titleAction={<AddAddress />}
        >
          <ApiErrorDisplay
            error={{
              status: "error",
              message: addressesResponse.message || "Failed to load addresses",
              statusCode: addressesResponse.statusCode || 500,
            }}
            title="Addresses Loading Error"
            size="medium"
          />
        </AccountPage>
      );
    }

    // Validate response structure
    if (!addressesResponse.data || !addressesResponse.data.addresses) {
      return (
        <AccountPage
          titleKey="account.addresses.title"
          titleAction={<AddAddress />}
        >
          <ApiErrorDisplay
            error={{
              status: "error",
              message: "Invalid addresses data received",
              statusCode: 500,
            }}
            title="Data Error"
            size="medium"
          />
        </AccountPage>
      );
    }

    const { addresses } = addressesResponse.data;

    return (
      <AccountPage
        titleKey="account.addresses.title"
        titleAction={<AddAddress />}
      >
        <Suspense fallback={<Spinner />}>
          <SafeAddressesList addresses={addresses} />
        </Suspense>
      </AccountPage>
    );
  } catch (error) {
    console.error("Addresses Page Error:", error);
    return (
      <AccountPage
        titleKey="account.addresses.title"
        titleAction={<AddAddress />}
      >
        <ApiErrorDisplay
          error={{
            status: "error",
            message:
              "An unexpected error occurred while loading addresses. Please try again.",
            statusCode: 500,
          }}
          title="Server Error"
          size="medium"
        />
      </AccountPage>
    );
  }
}

export default Page;
