import { Suspense } from 'react';
import Spinner from '@/app/_components/UI/Spinner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'This is the products page',
};

async function Layout({
  children,
}: {
  children: React.ReactNode;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}

export default Layout;
