import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import NavLink from '@/app/_components/UI/NavLink';
import FormSignup from '@/app/_components/Signup/FormSignup';

function page() {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10 lg:gap-6 xl:px-6">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        Tạo tài khoản Ryxel
      </h2>
      <div className="flex items-center justify-center gap-4">
        <p className="text-gray-400">Đã có tài khoản?</p>
        <NavLink href="/login">
          <FaArrowUpRightFromSquare />
          <span className="font-bold">Đi tới Đăng nhập</span>
        </NavLink>
      </div>
      <FormSignup />
    </div>
  );
}

export default page;
