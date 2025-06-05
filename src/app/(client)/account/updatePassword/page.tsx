import AccountPage from "@/app/_components/Account/AccountPage";
import { SafeFormUpdatePassword } from "@/app/_components/UI/ClientErrorBoundaryWrappers";

function Page() {
  return (
    <AccountPage
      titleKey="account.updatePassword.title"
      descriptionKey="account.updatePassword.description"
    >
      <div className="flex justify-center">
        <SafeFormUpdatePassword />
      </div>
    </AccountPage>
  );
}

export default Page;
