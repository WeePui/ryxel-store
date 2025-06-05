import AddAddress from "@/app/_components/Address/AddAddress";
import Spinner from "@/app/_components/UI/Spinner";
import { Suspense } from "react";
import AccountPage from "@/app/_components/Account/AccountPage";
import { SafeAddressesList } from "@/app/_components/UI/ClientErrorBoundaryWrappers";

function Page() {
  return (
    <AccountPage
      titleKey="account.addresses.title"
      titleAction={<AddAddress />}
    >
      <Suspense fallback={<Spinner />}>
        <SafeAddressesList />
      </Suspense>
    </AccountPage>
  );
}

export default Page;
