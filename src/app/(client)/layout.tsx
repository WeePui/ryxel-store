import { Manrope, Kanit } from "next/font/google";

import "@styles/globals.css";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import ToastProvider from "@components/UI/ToastProvider";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { checkToken } from "../_libs/apiServices";
import { redirect } from "next/navigation";
import LanguageClientProvider from "../_components/UI/LanguageClientProvider";
import ClientMainScreen from "../_components/UI/ClientMainScreen";
import {
  NotificationProvider,
  NotificationPermissionBanner,
} from "../_contexts/NotificationContext";

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
    template: "%s | Ryxel Store",
    default: "Welcome | Ryxel Store",
  },
  description:
    "High-end gaming gears like gaming mouses, gaming keyboards, chairs, ... for the best gaming experience in Vietnam. Free shipping for orders over 1,000,000 VND. Shop now!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");
  if (token) {
    try {
      const { isAdmin } = await checkToken(token);

      if (isAdmin) {
        redirect("/admin/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <html lang="vi" className={`${manrope.variable} ${kanit.variable}`}>
      <body
        className={
          "flex min-h-screen flex-col bg-secondary-100 text-primary-default antialiased"
        }
      >
        <LanguageClientProvider>
          <NotificationProvider>
            <NotificationPermissionBanner />
            <Header />
            <ToastProvider>
              <main className="flex-grow">
                <ClientMainScreen authToken={token?.value}>
                  {children}
                </ClientMainScreen>
              </main>
            </ToastProvider>
            <Footer />
          </NotificationProvider>
        </LanguageClientProvider>
      </body>
    </html>
  );
}
