import FormUpdateProduct from "@/app/_components/Admin/Products/FormUpdateProduct";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";
import { getCategories, getProductBySlug } from "@/app/_libs/apiServices";
import { cookies } from "next/headers";

// const data = {
//   product: {
//     _id: '12345',
//     name: 'Product 1',
//     lowestPrice: 100,
//     description: 'Product Description',
//     category: {
//       _id: 'category-1',
//       name: 'Category 1',
//       description: 'Category Description',
//       slug: 'category-1',
//       image: '/anya-so-cute.jpg',
//     } as Category,
//     slug: 'product-1',
//     imageCover: '/anya-so-cute.jpg',
//     brand: 'Anya',
//     sold: 10,
//     rating: 4.5,
//     ratingsQuantity: 100,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     variants: [
//       {
//         _id: 'variant-1',
//         name: 'Variant 1',
//         sku: 'SKU-123',
//         specifications: {
//           color: 'red',
//           size: 'M',
//           adjustability: 'Manufacturer Name',
//           weightCapacity: 'Anya',
//         },
//         price: 17890000,
//         stock: 10,
//         sold: 30,
//         images: [
//           '/anya-so-cute.jpg',
//           '/anya-so-cute.jpg',
//           '/anya-so-cute.jpg',
//           '/anya-so-cute.jpg',
//         ],
//         weight: 100,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         title: 'Variant Title',
//         saleOff: {
//           startDate: new Date(),
//           endDate: new Date(),
//           percentage: 10,
//         },
//       } as Variant,
//     ],
//     reviews: [],
//   } as Product,
//   categories: [
//     {
//       _id: 'category-1',
//       name: 'Category 1',
//       description: 'Category Description',
//       slug: 'category-1',
//       image: '/anya-so-cute.jpg',
//     } as Category,
//     {
//       _id: 'category-2',
//       name: 'Category 2',
//       description: 'Category Description',
//       slug: 'category-2',
//       image: '/anya-so-cute.jpg',
//     } as Category,
//   ],
// };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt")?.value || "";

  const { slug } = await params;
  const productData = await getProductBySlug(slug);

  if (productData.status === "error") {
    return <ApiErrorDisplay error={productData} title="Product Error" />;
  }

  const categoriesData = await getCategories({ value: token });

  if (categoriesData.status === "error") {
    return <ApiErrorDisplay error={categoriesData} title="Categories Error" />;
  }

  const { product } = productData;
  const { categories } = categoriesData.data;

  return (
    <div className="grid grid-cols-4 gap-6 p-6 md:grid-cols-1">
      <div className="col-span-full">
        <FormUpdateProduct product={product} categories={categories} />
      </div>
    </div>
  );
}
