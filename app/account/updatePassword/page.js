import AccountPage from '@/app/_components/Account/AccountPage';
import FormUpdatePassword from '@/app/_components/Account/FormUpdatePassword';

function Page() {
  return (
    <AccountPage
      title="Change your password"
      description="To secure your account, DO NOT share the password with anyone else"
    >
      <div className="flex justify-center">
        <FormUpdatePassword />
      </div>
    </AccountPage>
  );
}

export default Page;
