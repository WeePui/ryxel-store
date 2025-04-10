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

  const data = await getProfile(token!);
  if (data.status !== 'success') throw new Error(data.message);

  const user = data.data.user;

  if (!user)
    return <AccountPage title="My Profile" description={description} />;

  return (
    <AccountPage title="Hồ sơ tài khoản" description={description}>
      <FormUpdateProfile user={user} />
    </AccountPage>
  );
}

export default Profile;
