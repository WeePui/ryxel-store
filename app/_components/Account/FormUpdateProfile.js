'use client';

import { useActionState, useEffect, useState } from 'react';
import Spinner from '@/app/_components/UI/Spinner';
import { updateProfileAction } from '@libs/actions';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import NavLink from '@/app/_components/UI/NavLink';
import Button from '../UI/Button';
import Image from 'next/image';
import { toast } from 'react-toastify';

function FormUpdateProfile({ user }) {
  const [state, action, isPending] = useActionState(updateProfileAction, {
    success: false,
    errors: null,
  });
  const [previewPhoto, setPreviewPhoto] = useState(user.photo.url);

  useEffect(() => {
    if (state.success) {
      toast.success('Profile updated successfully');
      return;
    }
    if (state.errors) {
      toast.error(state.errors.message);
      return;
    }
  }, [state.success, state.errors, toast]);

  if (isPending) return <Spinner />;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    document.getElementById('photo').click();
  };

  return (
    <form className="flex py-2" action={action}>
      <div className="flex flex-[7] flex-col gap-4">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-grey-300">
              Username
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user && user.name}
              className="col-span-3 w-full rounded-lg border-2 border-grey-300 p-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right text-grey-300">
              Gender
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
                <label htmlFor="male">Male</label>
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
                <label htmlFor="female">Female</label>
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
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right text-grey-300">
              Email
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              <span>{user && user.email}</span>
              <NavLink href="/account/email" hoverUnderline={false}>
                <div className="flex items-center gap-2 text-xs font-semibold underline">
                  <FaArrowUpRightFromSquare />
                  Change
                </div>
              </NavLink>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right text-grey-300">
              Phone no.
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              {user?.phoneNo ? (
                user.phoneNo
              ) : (
                <span className="text-xs">
                  (You haven't added a phone number yet)
                </span>
              )}
              <NavLink href="/account/phone" hoverUnderline={false}>
                <div className="flex items-center gap-2 text-xs font-semibold underline">
                  <FaArrowUpRightFromSquare />
                  Change
                </div>
              </NavLink>
            </div>
          </div>
          {
            //TODO: Add birthday field if OAuth can't get user's birthday
          }
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right text-grey-300">
              Birthday
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              {user?.dob ? (
                user.dob
              ) : (
                <span className="text-xs">
                  (You haven't set your birthday yet)
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <div className="w-auto justify-self-center">
            <Button role="submit">Update profile</Button>
          </div>
        </div>
      </div>
      <div className="ml-6 w-[1px] bg-grey-300"></div>
      <div className="mt-6 flex flex-[3] flex-col items-center gap-4">
        <div
          className="relative aspect-square w-2/5 cursor-pointer overflow-hidden rounded-full"
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
          name="photo"
          id="photo"
          accept=".jpg, .jpeg, .png"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <Button role="button" onClick={handlePhotoClick}>
          <span className="text-sm">Change photo</span>
        </Button>
        <span className="text-sm text-gray-400">Format: .JPEG, .JPG, .PNG</span>
      </div>
    </form>
  );
}

export default FormUpdateProfile;
