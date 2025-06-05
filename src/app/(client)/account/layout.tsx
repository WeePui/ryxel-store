import SideNavigation from '@/app/_components/Account/SideNav';
import { Metadata } from 'next';
import ErrorBoundary from '@/app/_components/UI/ErrorBoundary';
import InlineError from '@/app/_components/UI/InlineError';

export const metadata: Metadata = {
  title: 'Manage Account',
  description: 'Manage your account details, vouchers, password and more.',
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-[25fr_75fr] gap-2 xl:px-2 lg:grid-cols-1">
      <ErrorBoundary
        fallback={
          <div className="py-10 pl-2">
            <InlineError
              message="Account navigation unavailable"
              type="error"
              size="medium"
            />
          </div>
        }
      >
        <SideNavigation />
      </ErrorBoundary>
      <ErrorBoundary
        fallback={
          <div className="h-auto py-8 lg:py-0">
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <InlineError
                message="Page content could not be loaded"
                type="error"
                size="medium"
              />
              <p className="mt-2 text-sm text-gray-600">
                Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>
          </div>
        }
      >
        <div className="h-auto py-8 lg:py-0">{children}</div>
      </ErrorBoundary>
    </div>
  );
}

export default Layout;
