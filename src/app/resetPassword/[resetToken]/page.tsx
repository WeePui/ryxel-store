import FormResetPassword from '@/app/_components/ResetPassword/FormResetPassword';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

interface Props {
  params: Promise<{ resetToken: string }>;
}

async function page({ params }: Props) {
  const { resetToken } = await params;

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-8">
      <h1 className="font-title text-3xl font-semibold text-primary-500">
        Đặt lại mật khẩu
      </h1>
      <FormResetPassword resetToken={resetToken} />
    </div>
  );
}

export default page;
