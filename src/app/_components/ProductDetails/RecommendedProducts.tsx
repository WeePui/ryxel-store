'use client';

import ProductCard from '../Products/ProductCard';

const products = [
  {
    _id: '1',
    name: 'Product 1',
    description: 'Description 1',
    brand: 'Brand 1',
    _categoryName: 'Category 1',
    variants: [
      {
        name: 'Variant 1',
        specifications: 'Specifications 1',
      },
    ],
    category: {
      name: 'Category 1',
    },
    lowestPrice: 9999999,
    imageCover: '/anya-so-cute.jpg',
    rating: 4.5,
    sold: 100,
  },
  {
    _id: '2',
    name: 'Product 2',
    description: 'Description 2',
    brand: 'Brand 2',
    category: {
      name: 'Category 2',
    },
    _categoryName: 'Category 2',
    variants: [
      {
        name: 'Variant 2',
        specifications: 'Specifications 2',
      },
    ],
    lowestPrice: 9999999,
    imageCover: '/anya-so-cute.jpg',
    rating: 4.5,
    sold: 100,
  },
];

export default function RecommendedProducts() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm gợi ý</h2>
      <div className="flex gap-4">
        {products.map((product) => (
          <ProductCard product={product} size="compact" key={product._id} />
        ))}
      </div>
    </div>
  );
}
