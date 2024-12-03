import FormForgotPassword from '../_components/ResetPassword/FormForgotPassword';

export const metadata = {
  title: 'Forgot Password',
  description: 'Forgot Password page',
};

function Page() {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-8">
      <h1 className="font-title text-3xl font-semibold text-primary-500">
        Reset Password
      </h1>

      <FormForgotPassword />
    </div>
  );
}

export default Page;
