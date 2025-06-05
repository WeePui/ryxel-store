"use client";

import AccountPage from '@/app/_components/Account/AccountPage';
import WishlistProductList from '@/app/_components/Wistlist/WishlistProductList';
import { getWishlistAction } from '@/app/_libs/actions';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/_contexts/LanguageContext';
import { Wishlist } from '@/app/_types/wishlist';
import ApiErrorDisplay from '@/app/_components/UI/ApiErrorDisplay';
import Button from '@/app/_components/UI/Button';
import { FaRedo } from 'react-icons/fa';

export default function WishlistPage() {
  const { t } = useLanguage();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    status: string;
    message: string;
    statusCode?: number;
  } | null>(null);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getWishlistAction();
      
      if (response.success && 'wishlist' in response) {
        setWishlist(response.wishlist);
      } else {
        setError({
          status: 'error',
          message: response.errors?.message || 'Failed to load wishlist',
          statusCode: 400,
        });
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError({
        status: 'error',
        message: err instanceof Error ? err.message : 'An unexpected error occurred while loading your wishlist.',
        statusCode: 500,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <AccountPage titleKey="account.wishlist.title" descriptionKey="account.wishlist.description">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
        </div>
      </AccountPage>
    );
  }

  if (error) {
    return (
      <AccountPage titleKey="account.wishlist.title" descriptionKey="account.wishlist.description">
        <div className="text-center">
          <ApiErrorDisplay
            error={error}
            title="Wishlist Loading Error"
            size="medium"
          />
          <div className="mt-4">
            <Button
              onClick={fetchWishlist}
              variant="primary"
              size="small"
              icon={<FaRedo />}
            >
              Try Again
            </Button>
          </div>
        </div>
      </AccountPage>
    );
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
      <AccountPage titleKey="account.wishlist.title" descriptionKey="account.wishlist.description">
        <div className="flex h-64 items-center justify-center text-lg font-semibold text-grey-400">
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
