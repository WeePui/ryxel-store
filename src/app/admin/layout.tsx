import { Manrope, Kanit } from "next/font/google";

import "@styles/globals.css";
import ToastProvider from "@components/UI/ToastProvider";
import { Metadata } from "next";
import AdminSidebar from "../_components/Admin/AdminSidebar";
import AdminHeader from "../_components/Admin/AdminHeader";
import { getProfile } from "../_libs/apiServices";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ToggleAdminSidebarProvider } from "../_contexts/ToggleAdminSidebarContext";
import LanguageClientProvider from "../_components/UI/LanguageClientProvider";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const kanit = Kanit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kanit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "Admin - %s | Ryxel Store",
    default: "Admin | Ryxel Store",
  },
  description:
    "Quản lí cửa hàng Ryxel Store - Nơi cung cấp các sản phẩm công nghệ chính hãng và chất lượng.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) return notFound();

  const { data } = await getProfile(token!);
  const { user } = data;

  if (user.role !== "admin") {
    redirect("/");
  }

  return (
    <html lang="vi" className={`${manrope.variable} ${kanit.variable}`}>
      <body
        className={
          "flex min-h-screen overflow-x-hidden bg-grey-50 text-primary-default antialiased"
        }
      >
        <LanguageClientProvider>
          <ToastProvider>
            <ToggleAdminSidebarProvider>
              <AdminSidebar />
              <div className="flex h-screen flex-1 flex-col overflow-hidden">
                <AdminHeader user={user} />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </ToggleAdminSidebarProvider>
          </ToastProvider>
        </LanguageClientProvider>
      </body>
    </html>
  );
}
