import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import NavLink from '@/app/_components/UI/NavLink';
import FormSignup from '@/app/_components/Signup/FormSignup';

function page({ children }) {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col items-center gap-10">
      <h2 className="font-title text-3xl font-semibold text-primary-500">
        Create a Ryxel Account
      </h2>
      <div className="flex items-center justify-center gap-4">
        <p className="text-gray-400">Already have an account?</p>
        <NavLink href="/login">
          <FaArrowUpRightFromSquare />
          <span className="font-bold">Go to Login</span>
        </NavLink>
      </div>
      <FormSignup />
    </div>
  );
}

export default page;
