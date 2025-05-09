import SideNavigation from '@/app/_components/Account/SideNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Account',
  description: 'Manage your account details, vouchers, password and more.',
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-[25fr_75fr] gap-2 xl:px-2 lg:grid-cols-1">
      <SideNavigation />
      <div className="h-auto py-8 lg:py-0">{children}</div>
    </div>
  );
}

export default Layout;
