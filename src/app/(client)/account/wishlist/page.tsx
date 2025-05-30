"use client";

import AccountPage from '@/app/_components/Account/AccountPage';
import WishlistProductList from '@/app/_components/Wistlist/WishlistProductList';
import { getWishlistAction } from '@/app/_libs/actions';
import  { useEffect, useState } from 'react';
import { useLanguage } from '@/app/_contexts/LanguageContext';
import { Wishlist } from '@/app/_types/wishlist';

export default function WishlistPage() {
  const { t } = useLanguage();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const { wishlist } = await getWishlistAction();
        setWishlist(wishlist);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <AccountPage titleKey="account.wishlist.title" descriptionKey="account.wishlist.description">
        <div className="flex h-full items-center justify-center py-8">
          Loading...
        </div>
      </AccountPage>
    );
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <AccountPage titleKey="account.wishlist.title" descriptionKey="account.wishlist.description">
        <div className="flex h-full items-center justify-center py-8 text-lg font-semibold text-grey-400">
          {t('account.wishlist.empty')}
        </div>
      </AccountPage>
    );
  }

  return (
    <AccountPage titleKey="account.wishlist.title" descriptionKey="account.wishlist.description">
      <WishlistProductList items={wishlist.products} />
    </AccountPage>
  );
}
