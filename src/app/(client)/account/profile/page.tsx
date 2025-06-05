import AccountPage from "@/app/_components/Account/AccountPage";
import FormUpdateProfile from "@/app/_components/Account/FormUpdateProfile";
import { getProfile } from "@/app/_libs/apiServices";
import { Metadata } from "next";
import { cookies } from "next/headers";
import ApiErrorDisplay from "@/app/_components/UI/ApiErrorDisplay";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your profile information to enhance security.",
};

async function Profile() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("jwt");

  if (!token) {
    return (
      <AccountPage
        titleKey="account.profile.title"
        descriptionKey="account.profile.description"
      >
        <ApiErrorDisplay
          error={{
            status: 'error',
            message: 'Authentication required. Please log in to continue.',
            statusCode: 401,
          }}
          title="Authentication Required"
          size="medium"
        />
      </AccountPage>
    );
  }

  try {
    const response = await getProfile(token);
    
    if (response.status === 'error') {
      return (
        <AccountPage
          titleKey="account.profile.title"
          descriptionKey="account.profile.description"
        >
          <ApiErrorDisplay
            error={response}
            title="Profile Loading Error"
            size="medium"
          />
        </AccountPage>
      );
    }

    const { user } = response.data;

    if (!user) {
      return (
        <AccountPage
          titleKey="account.profile.title"
          descriptionKey="account.profile.description"
        >
          <ApiErrorDisplay
            error={{
              status: 'error',
              message: 'User profile data is not available.',
              statusCode: 404,
            }}
            title="User Not Found"
            size="medium"
          />
        </AccountPage>
      );
    }

    return (
      <AccountPage
        titleKey="account.profile.title"
        descriptionKey="account.profile.description"
      >
        <FormUpdateProfile user={user} />
      </AccountPage>
    );
  } catch (error) {
    console.error('Profile page error:', error);
    return (
      <AccountPage
        titleKey="account.profile.title"
        descriptionKey="account.profile.description"
      >
        <ApiErrorDisplay
          error={{
            status: 'error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred while loading your profile.',
            statusCode: 500,
          }}
          title="Profile Error"
          size="medium"
        />
      </AccountPage>
    );
  }
}

export default Profile;
