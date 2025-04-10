import Image from 'next/image';

import SideNavList from './SideNavList';
import { getProfile } from '../../_libs/apiServices';
import { cookies } from 'next/headers';

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

  return (
    <div className="py-10 pl-2 sticky top-0 max-h-[calc(100vh-2rem)] h-fit">
      <div className="flex items-center gap-6">
        <div className="relative aspect-square w-1/4 overflow-hidden rounded-full ring-2 ring-primary-default">
          <Image src={user?.photo?.url} alt={user.name} fill />
        </div>
        <span className="text-lg font-bold text-grey-300">{user?.name}</span>
      </div>
      <SideNavList />
    </div>
  );
}

export default SideNavigation;
