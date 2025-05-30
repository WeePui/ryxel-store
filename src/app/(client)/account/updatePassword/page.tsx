import AccountPage from "@/app/_components/Account/AccountPage";
import FormUpdatePassword from "@/app/_components/Account/FormUpdatePassword";

function Page() {
  return (
    <AccountPage
      titleKey="account.updatePassword.title"
      descriptionKey="account.updatePassword.description"
    >
      <div className="flex justify-center">
        <FormUpdatePassword />
      </div>
    </AccountPage>
  );
}

export default Page;
