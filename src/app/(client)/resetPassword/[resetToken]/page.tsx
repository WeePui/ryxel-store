import ResetPasswordPage from "@/app/_components/ResetPassword/ResetPasswordPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

interface Props {
  params: Promise<{ resetToken: string }>;
}

async function page({ params }: Props) {
  const { resetToken } = await params;

  return <ResetPasswordPage resetToken={resetToken} />;
}

export default page;
