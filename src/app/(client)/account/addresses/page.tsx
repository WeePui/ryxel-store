import AddAddress from "@/app/_components/Address/AddAddress";
import AddressesList from "@/app/_components/Address/AddressesList";
import Spinner from "@/app/_components/UI/Spinner";
import { Suspense } from "react";
import AccountPage from "@/app/_components/Account/AccountPage";

function Page() {
  return (
    <AccountPage
      titleKey="account.addresses.title"
      titleAction={<AddAddress />}
    >
      <Suspense fallback={<Spinner />}>
        <AddressesList />
      </Suspense>
    </AccountPage>
  );
}

export default Page;
