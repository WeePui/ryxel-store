import AccountPage from "@/app/_components/Account/AccountPage";
import FormUpdateProfile from "@/app/_components/Account/FormUpdateProfile";
import { getProfile } from "@/app/_libs/apiServices";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your profile information to enhance security.",
};

async function Profile() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  const data = await getProfile(token!);
  if (data.status !== "success") throw new Error(data.message);

  const user = data.data.user;

  if (!user)
    return (
      <AccountPage
        titleKey="account.profile.title"
        descriptionKey="account.profile.description"
      />
    );

  return (
    <AccountPage
      titleKey="account.profile.title"
      descriptionKey="account.profile.description"
    >
      <FormUpdateProfile user={user} />
    </AccountPage>
  );
}

export default Profile;
