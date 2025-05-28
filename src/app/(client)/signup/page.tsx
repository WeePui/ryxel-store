import ClientSignupPage from "@/app/_components/Signup/ClientSignupPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

function page() {
  return <ClientSignupPage />;
}

export default page;
