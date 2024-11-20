import SideNavigation from '../_components/SideNavigation';

export const metadata = {
  title: 'Manage Account',
  description: 'Manage your account details, vouchers, password and more.',
};

function Layout({ children }) {
  return (
    <div className="grid grid-cols-[20fr_80fr] h-full gap-10">
      <SideNavigation />
      <div className="p-8">{children}</div>
    </div>
  );
}

export default Layout;
