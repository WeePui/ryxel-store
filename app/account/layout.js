import SideNavigation from '@/app/_components/Account/SideNav';

export const metadata = {
  title: 'Manage Account',
  description: 'Manage your account details, vouchers, password and more.',
};

function Layout({ children }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-[25fr_75fr] gap-2">
      <SideNavigation />
      <div className="h-auto py-8">{children}</div>
    </div>
  );
}

export default Layout;
