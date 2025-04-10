import AccountPage from '@/app/_components/Account/AccountPage';
import WishlistProductList from '@/app/_components/Wistlist/WishlistProductList';
import { getWishlistAction } from '@/app/_libs/actions';
import React from 'react';

const description =
  'Quản lí danh sách yêu thích của bạn để dễ dàng theo dõi và mua sắm.';

export const metadata = {
  title: 'Danh sách yêu thích',
  description,
};

export default async function page() {
  const { wishlist } = await getWishlistAction();

  if (!wishlist) {
    return (
      <AccountPage title="Danh sách yêu thích" description={description}>
        <div className="flex h-full items-center justify-center py-8 text-lg font-semibold text-grey-400">
          Không có sản phẩm nào trong danh sách của bạn.
        </div>
      </AccountPage>
    );
  }
  if (wishlist.products.length === 0) {
    return (
      <AccountPage title="Danh sách yêu thích" description={description}>
        <div className="flex h-full items-center justify-center py-8 text-lg font-semibold text-grey-400">
          Không có sản phẩm nào trong danh sách của bạn.
        </div>
      </AccountPage>
    );
  }

  return (
    <AccountPage title="Danh sách yêu thích" description={description}>
      <WishlistProductList items={wishlist.products} />
    </AccountPage>
  );
}
