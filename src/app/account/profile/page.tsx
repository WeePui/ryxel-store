import AccountPage from '@/app/_components/Account/AccountPage';
import FormUpdateProfile from '@/app/_components/Account/FormUpdateProfile';
import { getProfile } from '@/app/_libs/apiServices';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

const description = 'Quản lí thông tin hồ sơ của bạn để tăng tính bảo mật.';

export const metadata: Metadata = {
  title: 'My Profile',
  description,
};

async function Profile() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  let user = null;

  try {
    if (!token) throw new Error('Unauthorized');

    const data = await getProfile(token);
    if (data.status !== 'success') throw new Error(data.message);
    user = data.data.user;
  } catch (error) {
    return (
      <AccountPage
        title="My Profile"
        description={description}
        error={error as Error}
      />
    );
  }

  return (
    <AccountPage title="Hồ sơ tài khoản" description={description}>
      {user && <FormUpdateProfile user={user} />}
    </AccountPage>
  );
}

export default Profile;
