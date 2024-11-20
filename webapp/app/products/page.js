import Counter from '@/app/_components/Counter';
import { getProducts } from '@libs/apiServices';

export const metadata = {
  title: 'Products Page',
  description: 'This is the products page',
};

export default async function page() {
  const { products, results } = await getProducts();

  return (
    <div>
      <h1>Products Page</h1>
    </div>
  );
}
