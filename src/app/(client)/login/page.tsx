import LoginPage from "@/app/_components/Login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

async function Login() {
  return <LoginPage />;
}

export default Login;
