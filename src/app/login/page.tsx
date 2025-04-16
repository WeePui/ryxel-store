import Button from '@/app/_components/UI/Button';
import FormLogin from '@/app/_components/Login/FormLogin';
import NavLink from '@/app/_components/UI/NavLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

async function Login() {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 lg:gap-6 xl:px-6">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        Tài khoản Ryxel
      </h2>
      <FormLogin />
      <NavLink href="/forgot-password">Quên mật khẩu?</NavLink>
      <hr className="my-1 w-1/2 border-t border-gray-200" />
      <div className="flex flex-col items-center gap-4">
        <p>Bạn chưa có tài khoản?</p>
        <Button type="primary" href="/signup">
          Tạo tài khoản
        </Button>
      </div>
    </div>
  );
}

export default Login;
