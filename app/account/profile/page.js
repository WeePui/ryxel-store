import AccountPage from '@/app/_components/Account/AccountPage';
import FormUpdateProfile from '@/app/_components/Account/FormUpdateProfile';
import { getProfile } from '@/app/_libs/apiServices';
import { cookies } from 'next/headers';

const description = 'Manage your profile information to secure your account.';

export const metadata = {
  title: 'My Profile',
  description,
};

async function Profile() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  let user = null;

  try {
    const data = await getProfile(token);
    if (data.status !== 'success') throw new Error(data.message);
    user = data.data.user;
  } catch (error) {
    return (
      <AccountPage title="My Profile" description={description} error={error} />
    );
  }

  return (
    <AccountPage title="My Profile" description={description}>
      {user && <FormUpdateProfile user={user} />}
    </AccountPage>
  );
}

export default Profile;
