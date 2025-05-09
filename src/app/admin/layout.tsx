import { Manrope, Kanit } from 'next/font/google';

import '@styles/globals.css';
import ToastProvider from '@components/UI/ToastProvider';
import { Metadata } from 'next';
import AdminSidebar from '../_components/Admin/AdminSidebar';
import AdminHeader from '../_components/Admin/AdminHeader';
import { getProfile } from '../_libs/apiServices';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ToggleAdminSidebarProvider } from '../_contexts/ToggleAdminSidebarContext';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const kanit = Kanit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    template: 'Admin - %s | Ryxel Store',
    default: 'Admin | Ryxel Store',
  },
  description:
    'Quản lí cửa hàng Ryxel Store - Nơi cung cấp các sản phẩm công nghệ chính hãng và chất lượng.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  const { data } = await getProfile(token!);
  const { user } = data;

  if (user.role !== 'admin') {
    redirect('/');
  }

  return (
    <html lang="vi" className={`${manrope.variable} ${kanit.variable}`}>
      <body
        className={
          'flex min-h-screen bg-grey-50 text-primary-default antialiased overflow-x-hidden'
        }
      >
        <ToastProvider>
          <ToggleAdminSidebarProvider>
            <AdminSidebar />
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
              <AdminHeader user={user} />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </ToggleAdminSidebarProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
