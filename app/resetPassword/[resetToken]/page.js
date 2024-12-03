import FormResetPassword from '@/app/_components/ResetPassword/FormResetPassword';

export const metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

async function page({ params }) {
  const { resetToken } = await params;

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-8">
      <h1 className="font-title text-3xl font-semibold text-primary-500">
        Reset Password
      </h1>
      <FormResetPassword resetToken={resetToken} />
    </div>
  );
}

export default page;
