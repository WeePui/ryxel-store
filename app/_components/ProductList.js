import ProductCard from './ProductCard';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-4 gap-x-8 gap-y-12">
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}

export default ProductList;
