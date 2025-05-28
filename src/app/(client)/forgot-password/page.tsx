import { Metadata } from "next";
import ForgotPasswordPage from "../../_components/ResetPassword/ForgotPasswordPage";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password page",
};

function Page() {
  return <ForgotPasswordPage />;
}

export default Page;
