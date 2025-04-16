import { getProfile } from '../../_libs/apiServices';
import { cookies } from 'next/headers';
import ClientWrapper from './ClientWrapper';

async function SideNavigation() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');
  let user;

  try {
    const { status, data } = await getProfile(token!);
    user = data.user;
    if (status !== 'success') throw new Error('Failed to get profile');
  } catch (error) {
    return <div className="py-10 pl-2">{(error as Error).message}</div>;
  }

  return <ClientWrapper user={user} />;
}

export default SideNavigation;
