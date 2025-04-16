import NavLink from '../UI/NavLink';
import LoggedUser from '@/app/_components/Header/LoggedUser';
import { checkToken, getProfile } from '@libs/apiServices';
import { cookies } from 'next/headers';
import { FaCircleUser } from 'react-icons/fa6';

async function HeaderUser() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token)
    return (
      <NavLink hoverUnderline={false} href="/login">
        <div className="flex items-center gap-2">
          <FaCircleUser className="text-xl" />
          <span className="lg:hidden">Đăng nhập</span>
        </div>
      </NavLink>
    );

  const { valid } = await checkToken(token);
  if (!valid) {
    return (
      <NavLink hoverUnderline={false} href="/login">
        <div className="flex items-center gap-2">
          <FaCircleUser className="text-xl" />
          <span className="lg:hidden">Đăng nhập</span>
        </div>
      </NavLink>
    );
  }

  try {
    const { data } = await getProfile(token);
    const { user } = data;
    return <>{user && <LoggedUser user={user} />}</>;
  } catch (error) {
    console.error('Failed to fetch user:', error);

    return (
      <NavLink hoverUnderline={false} href="/login">
        <div className="flex items-center gap-2">
          <FaCircleUser className="text-xl" />
          <span className="lg:hidden">Đăng nhập</span>
        </div>
      </NavLink>
    );
  }
}

export default HeaderUser;
