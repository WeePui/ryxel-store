import { Suspense } from "react";
import ProductsPage from "../../_components/Products/ProductsPage";
import Loader from "../../_components/UI/Loader";

export const revalidate = 1800;

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

async function Page({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      }
    >
      <ProductsPage searchParams={searchParams} />
    </Suspense>
  );
}

export default Page;
