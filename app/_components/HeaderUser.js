import NavLink from './NavLink';
import LoggedUser from '@components/LoggedUser';
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
          <span>Login</span>
        </div>
      </NavLink>
    );

  const { valid } = await checkToken(token);
  if (!valid) {
    return (
      <NavLink hoverUnderline={false} href="/login">
        <div className="flex items-center gap-2">
          <FaCircleUser className="text-xl" />
          <span>Login</span>
        </div>
      </NavLink>
    );
  }

  try {
    const { user } = await getProfile(token);
    return <>{user && <LoggedUser user={user} />}</>;
  } catch (error) {
    return (
      <NavLink hoverUnderline={false} href="/login">
        <div className="flex items-center gap-2">
          <FaCircleUser className="text-xl" />
          <span>Login</span>
        </div>
      </NavLink>
    );
  }
}

export default HeaderUser;
