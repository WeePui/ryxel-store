"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkToken } from "../../_libs/apiServices";

interface AdminRedirectProps {
  token?: string;
}

export default function AdminRedirect({ token }: AdminRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const checkAdminStatus = async () => {
      try {
        const { isAdmin } = await checkToken({ value: token });
        if (isAdmin) {
          router.replace("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdminStatus();
  }, [token, router]);

  return null; // This component doesn't render anything
}
