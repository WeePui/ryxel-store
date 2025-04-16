'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import Spinner from '@/app/_components/UI/Spinner';
import { sendOTPAction, updateProfileAction } from '@libs/actions';
import { FaArrowUpRightFromSquare, FaCircleInfo } from 'react-icons/fa6';
import NavLink from '@/app/_components/UI/NavLink';
import Button from '../UI/Button';
import Image from 'next/image';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import Loader from '../UI/Loader';
import { User } from '@/app/_types/user';
import { useRouter } from 'next/navigation';

interface FormUpdateProfileProps {
  user: User;
}

function FormUpdateProfile({ user }: FormUpdateProfileProps) {
  const [, startTransition] = useTransition();
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const updateProfileActionWithPhoto = updateProfileAction.bind(null, photo);
  const [state, action, isPending] = useActionState(
    updateProfileActionWithPhoto,
    {
      success: false,
      errors: { name: '', photo: '', message: '' },
    }
  );
  const [previewPhoto, setPreviewPhoto] = useState(user.photo.url);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Profile updated successfully');
      router.push('/account/profile');
      return;
    }
    if (state.errors) {
      if ('message' in state.errors && state.errors.message) {
        toast.error(state.errors.message);
      }
      return;
    }
  }, [state.success, state.errors]);

  if (isPending) return <Loader />;

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file) {
      try {
        setIsLoading(true);
        const options = {
          maxSizeMB: 1,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setPreviewPhoto(URL.createObjectURL(compressedFile));
        setPhoto(compressedFile);
      } catch {
        toast.error('Failed to compress image');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyEmail = () => {
    startTransition(async () => {
      const result = await sendOTPAction({ counter: 0 });
      if (result.success) {
        toast.success('OTP sent successfully');
        router.push('/signup/verifyEmail');
      } else {
        toast.error(result.errors!.message);
      }
    });
  };

  const handlePhotoClick = () => {
    document.getElementById('photo')!.click();
  };

  return (
    <form className="flex py-2 md:flex-col" action={action}>
      <div className="flex flex-[7] flex-col gap-4">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-4 md:grid-cols-1 md:items-start md:gap-2 items-center gap-4">
            <label
              htmlFor="name"
              className="text-right text-grey-300 md:text-left"
            >
              Tên tài khoản
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user && user.name}
              className="col-span-3 w-full rounded-lg border-2 border-grey-300 p-2"
            />
          </div>
          <div className="grid grid-cols-4 md:grid-cols-1 md:items-start md:gap-2 items-center gap-4">
            <label
              htmlFor="gender"
              className="text-right text-grey-300 md:text-left"
            >
              Giới tính
            </label>
            <div className="col-span-3 flex w-full gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  className="capitalize"
                  defaultChecked={user?.gender === 'male'}
                />
                <label htmlFor="male">Nam</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  className="capitalize"
                  defaultChecked={user?.gender === 'female'}
                />
                <label htmlFor="female">Nữ</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  id="other"
                  className="capitalize"
                  defaultChecked={user?.gender === 'other'}
                />
                <label htmlFor="other">Khác</label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-1 md:items-start md:gap-2 items-center gap-4">
            <label
              htmlFor="email"
              className="text-right text-grey-300 md:text-left"
            >
              Email
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              <span>{user && user.email}</span>{' '}
              {!user.emailVerified && (
                <NavLink href="#" hoverUnderline={false}>
                  <div
                    className="flex items-center gap-2 text-xs font-semibold underline"
                    onClick={handleVerifyEmail}
                  >
                    <FaArrowUpRightFromSquare />
                    Xác thực
                  </div>
                </NavLink>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-1 md:items-start md:gap-2 items-center gap-4">
            <label
              htmlFor="phone"
              className="text-right text-grey-300 md:text-left"
            >
              Số điện thoại
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              {user?.phoneNo ? (
                user.phoneNo
              ) : (
                <span className="text-xs">
                  (Bạn vẫn chưa thêm số điện thoại)
                </span>
              )}
              <NavLink href="#" hoverUnderline={false}>
                <div
                  className="flex items-center gap-2 text-xs font-semibold underline"
                  onClick={() => {}}
                >
                  <FaArrowUpRightFromSquare />
                  Thay đổi
                </div>
              </NavLink>
            </div>
          </div>
          {
            //TODO: Add birthday field if OAuth can't get user's birthday
          }
          <div className="grid grid-cols-4 md:grid-cols-1 md:items-start md:gap-2 items-center gap-4">
            <label
              htmlFor="dob"
              className="text-right text-grey-300 md:text-left"
            >
              Sinh nhật
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              {user?.dob ? (
                new Date(user.dob).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })
              ) : (
                <span className="text-xs">(Bạn vẫn chưa thêm ngày sinh)</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <div className="w-auto justify-self-center">
            <Button
              role="submit"
              disabled={isLoading || isPending}
              size="medium"
            >
              Cập nhật hồ sơ
            </Button>
          </div>
        </div>
      </div>
      <div className="ml-6 w-[1px] bg-grey-300"></div>
      <div className="mt-6 flex flex-[3] flex-col items-center gap-4 md:order-first md:mb-12">
        {isLoading ? (
          <div className="flex flex-[3] flex-col items-center gap-4">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 md:gap-1">
            <div
              className="relative aspect-square w-3/5 cursor-pointer overflow-hidden rounded-full"
              onClick={handlePhotoClick}
            >
              <Image
                src={previewPhoto}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            <input
              type="file"
              id="photo"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <Button
              role="button"
              onClick={handlePhotoClick}
              disabled={isLoading || isPending}
              size="small"
              className="md:hidden"
            >
              Đổi ảnh đại diện
            </Button>
            <span className="items-center gap-2 mt-2 text-md font-semibold text-grey-300 hidden md:flex">
              <FaCircleInfo /> Bấm vào ảnh để thay đổi
            </span>
            <span className="text-md md:text-xs text-gray-400">
              Định dạng: .JPEG, .JPG, .PNG
            </span>
          </div>
        )}
      </div>
    </form>
  );
}

export default FormUpdateProfile;
