import UserDetailClient from "@/app/_components/Admin/Users/UserDetailClient";
import { cookies } from "next/headers";

interface PageProps {
  params: {
    userId: string;
  };
}

export default async function UserDetailPage({ params }: PageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Đăng nhập để tiếp tục");
  }

  const { userId } = params;

  return <UserDetailClient userId={userId} authToken={token} />;
}
