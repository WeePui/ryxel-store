import { Suspense } from 'react';
import Spinner from '@components/Spinner';

export const metadata = {
  title: 'Products Page',
  description: 'This is the products page',
};

function Layout({ children }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}

export default Layout;
