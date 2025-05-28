import VerifyEmail from "@/app/_components/Signup/VerifyEmail";

export const metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

async function page() {
  return <VerifyEmail />;
}

export default page;
