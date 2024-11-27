import Button from '@/app/_components/Button';
import Counter from '@/app/_components/Counter';
import { getProductById } from '@/app/_libs/apiServices';
import Image from 'next/image';
import { FaCartShopping, FaStar } from 'react-icons/fa6';

async function ProductDetails({ params }) {
  const { productId } = await params;
  const { product } = await getProductById(productId);

  return (
    <section className="h-[36rem] bg-grey-400">
      <div className="mx-auto grid h-full max-w-[77.5rem] translate-y-12 grid-cols-[65fr_35fr] overflow-hidden rounded-3xl bg-white px-12 py-6 shadow-lg">
        <div className="flex flex-col gap-6">
          <p className="">Store - Hardware - Super crazy stuff</p>
          <div className="relative flex aspect-video h-96 w-full flex-col">
            <Image
              src={product.variants[0].images[0]}
              alt={product.variants[0].name}
              className="object-contain pr-10"
              fill
            />
          </div>
          <div className="flex items-center gap-4">
            {product.variants[0].images.map((image, index) => (
              <div className="relative h-16 w-28 overflow-hidden rounded-2xl border-2 border-grey-100">
                <Image
                  src={image}
                  alt={`${product.variants[0].name} image ${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="py-8">
          <div className="mb-6">
            <span className="flex items-center text-sm text-grey-500">
              <span className="mr-2 text-2xl font-bold text-primary-default">
                &#10072;
              </span>
              {product.category.name}
            </span>
          </div>

          <h2 className="mb-4 font-title text-3xl font-bold text-grey-default">
            {product.name}
          </h2>

          <div className="mb-8">
            <span className="flex items-center">
              <FaStar className="mr-2 text-xl text-yellow-500" />
              <span className="mr-1 font-semibold">{product.rating}</span>
              <span className="text-xs text-grey-500">
                (in {product.ratingsQuantity} reviews)
              </span>
            </span>
          </div>

          <p className="mb-6 text-xs text-grey-500">Select a variant:</p>
          <div className="mb-6 flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <Button type="filter" key={variant._id}>
                {variant.name}
              </Button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-grey-default">
            ${product.variants[0].price}
          </h2>

          <div className="mt-6 grid grid-cols-[30fr_70fr] items-center gap-4">
            <Counter />
            <Button type="primaryLarge">
              <FaCartShopping />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
