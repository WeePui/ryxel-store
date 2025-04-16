import { cookies } from 'next/headers';
import RevalidationForm from '../_components/Revalidate/RevalidationForm';
import NavLink from '../_components/UI/NavLink';
import { getProfile } from '../_libs/apiServices';
import Image from 'next/image';

async function Reauthenticate() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt');

  if (!token) {
    return null;
  }

  const { data } = await getProfile(token);
  const { user } = data;

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 xl:px-6">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        Nhập lại mật khẩu
      </h2>
      <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10">
        <div className="flex w-full max-w-2xl flex-col items-center gap-2 rounded-lg bg-white px-16 sm:px-6 py-8 shadow-sm">
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={user.photo.url}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="mb-8 text-center text-xl font-extrabold text-primary-500">
            {user?.name}
          </h3>
          <RevalidationForm />
        </div>
      </div>
      <NavLink href="/forgot-password">Quên mật khẩu?</NavLink>
    </div>
  );
}

export default Reauthenticate;
