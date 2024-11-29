import Button from '@components/Button';
import FormLogin from '@components/FormLogin';
import NavLink from '@components/NavLink';

export const metadata = {
  title: 'Login',
  description: 'Login to your account',
};

async function Login() {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        Ryxel Account
      </h2>
      <FormLogin />
      <NavLink href="/forgotPassword">Forgot your password?</NavLink>
      <hr className="my-1 w-1/2 border-t border-gray-200" />
      <div className="flex flex-col items-center gap-4">
        <p>Don't have an account?</p>
        <Button type="primary" href="/signup">
          Create an account
        </Button>
      </div>
    </div>
  );
}

export default Login;
