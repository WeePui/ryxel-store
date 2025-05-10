'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { Wishlist } from '../_types/wishlist';
import { toast } from 'react-toastify';
import {
  addProductToWishlistAction,
  getWishlistAction,
  removeProductFromWishlistAction,
} from '../_libs/actions';
import Modal from '../_components/UI/Modal';
import ConfirmDialogue from '../_components/UI/ConfirmDialogue';
import { useRouter } from 'next/navigation';

interface WishlistContextType {
  wishlist: Wishlist | null;
  addProductToWishlist: (productId: string) => void;
  removeProductFromWishlist: (productId: string) => void;
  checkProductInWishlist: (productId: string, wishlist: Wishlist) => boolean;
  isPending: boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [, startTransition] = useTransition();
  const [isPending, setIsPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Lấy wishlist từ localStorage khi component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist)); // Giải mã wishlist từ localStorage
    } else {
      const fetchWishlist = async () => {
        const result = await getWishlistAction();
        if (!result.success && result.errors) {
          toast.error(result.errors!.message);
          setWishlist(null); // Nếu không thành công, đặt wishlist là null
        } else {
          setWishlist(result.wishlist);
          localStorage.setItem('wishlist', JSON.stringify(result.wishlist)); // Lưu vào localStorage nếu không có dữ liệu
        }
      };

      fetchWishlist();
    }
  }, []);

  function checkProductInWishlist(
    productId: string,
    wishlist: Wishlist
  ): boolean {
    return wishlist && wishlist.products
      ? wishlist.products.some((item) => item._id === productId)
      : false;
  }

  const addProductToWishlist = (productId: string) => {
    setIsPending(true);

    startTransition(async () => {
      if (wishlist && checkProductInWishlist(productId, wishlist)) {
        toast.warning(
          'Sản phẩm này đã có trong danh sách yêu thích của bạn. Vui lòng kiểm tra danh sách yêu thích.'
        );
        setIsPending(false);
        return;
      }

      const result = await addProductToWishlistAction(productId);

      if (result.success) {
        const updatedWishlist = result.wishlist;
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Lưu wishlist vào localStorage
        toast.success('Sản phẩm đã được thêm vào danh sách yêu thích!');
      } else {
        if (result.errors?.message === 'No token found. Please log in again.') {
          setIsModalOpen(true); // Mở modal khi chưa đăng nhập
        } else {
          toast.error(result.errors!.message);
        }
      }

      setIsPending(false);
    });
  };

  const removeProductFromWishlist = (productId: string) => {
    setIsPending(true);

    startTransition(async () => {
      const result = await removeProductFromWishlistAction(productId);
      if (result.success) {
        const updatedWishlist = result.wishlist;
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Lưu wishlist vào localStorage
        toast.success('Sản phẩm đã được xóa khỏi danh sách yêu thích!');
      } else {
        if (result.errors?.message === 'No token found. Please log in again.') {
          setIsModalOpen(true); // Mở modal khi chưa đăng nhập
        } else {
          toast.error(result.errors!.message);
        }
      }

      setIsPending(false);
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addProductToWishlist,
        isPending,
        removeProductFromWishlist,
        checkProductInWishlist,
      }}
    >
      {/* Modal đăng nhập */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ConfirmDialogue
            onConfirm={() => {
              setIsModalOpen(false);
              router.push('/login');
            }}
            confirmText="Xác nhận"
            message="Bạn chưa đăng nhập nên không thể sử dụng tính năng này, vui lòng đăng nhập trước!"
          />
        </Modal>
      )}
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}

export { WishlistProvider, useWishlist };
