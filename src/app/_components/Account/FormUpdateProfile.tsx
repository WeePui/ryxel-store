"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import Spinner from "@/app/_components/UI/Spinner";
import { sendOTPAction, updateProfileAction } from "@libs/actions";
import { FaArrowUpRightFromSquare, FaCircleInfo } from "react-icons/fa6";
import NavLink from "@/app/_components/UI/NavLink";
import Button from "../UI/Button";
import Image from "next/image";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import Loader from "../UI/Loader";
import { User } from "@/app/_types/user";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface FormUpdateProfileProps {
  user: User;
}

function FormUpdateProfile({ user }: FormUpdateProfileProps) {
  const { t } = useLanguage();
  const [, startTransition] = useTransition();
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const updateProfileActionWithPhoto = updateProfileAction.bind(null, photo);
  const [state, action, isPending] = useActionState(
    updateProfileActionWithPhoto,
    {
      success: false,
      errors: { name: "", photo: "", message: "" },
    },
  );
  const [previewPhoto, setPreviewPhoto] = useState(user.photo.url);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Profile updated successfully");
      router.push("/account/profile");
      return;
    }
    if (state.errors) {
      if ("message" in state.errors && state.errors.message) {
        toast.error(state.errors.message);
      }
      return;
    }
  }, [state.success, state.errors, router]);

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
        toast.error("Failed to compress image");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyEmail = () => {
    startTransition(async () => {
      const result = await sendOTPAction({ counter: 0 });
      if (result.success) {
        toast.success("OTP sent successfully");
        router.push("/signup/verifyEmail");
      } else {
        toast.error(result.errors!.message);
      }
    });
  };

  const handlePhotoClick = () => {
    document.getElementById("photo")!.click();
  };

  return (
    <form className="flex py-2 md:flex-col" action={action}>
      <div className="flex flex-[7] flex-col gap-4">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-1 md:items-start md:gap-2">
            <label
              htmlFor="name"
              className="text-right text-grey-300 md:text-left"
            >
              {t("account.profile.personalInfo")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user && user.name}
              className="col-span-3 w-full rounded-lg border-2 border-grey-300 p-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-1 md:items-start md:gap-2">
            <label
              htmlFor="gender"
              className="text-right text-grey-300 md:text-left"
            >
              {t("account.profile.gender")}
            </label>
            <div className="col-span-3 flex w-full gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  className="capitalize"
                  defaultChecked={user?.gender === "male"}
                />
                <label htmlFor="male">{t("account.profile.male")}</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  className="capitalize"
                  defaultChecked={user?.gender === "female"}
                />
                <label htmlFor="female">{t("account.profile.female")}</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  id="other"
                  className="capitalize"
                  defaultChecked={user?.gender === "other"}
                />
                <label htmlFor="other">{t("account.profile.other")}</label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-1 md:items-start md:gap-2">
            <label
              htmlFor="email"
              className="text-right text-grey-300 md:text-left"
            >
              {t("account.profile.email")}
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              <span>{user && user.email}</span>
              {!user.emailVerified && (
                <NavLink href="#" hoverUnderline={false}>
                  <div
                    className="flex items-center gap-2 text-xs font-semibold underline"
                    onClick={handleVerifyEmail}
                  >
                    <FaArrowUpRightFromSquare />
                    {t("account.profile.verify")}
                  </div>
                </NavLink>
              )}
            </div>
          </div>
          {
            //TODO: Add birthday field if OAuth can't get user's birthday
          }
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-1 md:items-start md:gap-2">
            <label
              htmlFor="dob"
              className="text-right text-grey-300 md:text-left"
            >
              {t("account.profile.birthday")}
            </label>
            <div className="col-span-3 flex w-full items-center gap-4">
              {user?.dob ? (
                new Date(user.dob).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              ) : (
                <span className="text-xs">
                  {t("account.profile.birthdayNotAdded")}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <div className="w-auto justify-self-center">
            <Button
              role="submit"
              loading={isLoading || isPending}
              size="medium"
            >
              {t("account.profile.updateProfile")}
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
              loading={isLoading || isPending}
              size="small"
              className="md:hidden"
            >
              {t("account.profile.changeAvatar")}
            </Button>
            <span className="text-md mt-2 hidden items-center gap-2 font-semibold text-grey-300 md:flex">
              <FaCircleInfo /> {t("account.profile.clickToChange")}
            </span>
            <span className="text-md text-gray-400 md:text-xs">
              {t("account.profile.imageFormat")}
            </span>
          </div>
        )}
      </div>
    </form>
  );
}

export default FormUpdateProfile;
