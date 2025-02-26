import AccountPage from '@/app/_components/Account/AccountPage';
import FormUpdatePassword from '@/app/_components/Account/FormUpdatePassword';

function Page() {
  return (
    <AccountPage
      title="Đổi mật khẩu"
      description="Nhằm bảo mật tài khoản, TUYỆT ĐỐI không chia sẻ mật khẩu với bất kì ai"
    >
      <div className="flex justify-center">
        <FormUpdatePassword />
      </div>
    </AccountPage>
  );
}

export default Page;
