import NavLink from '@components/NavLink';
import { FaCircleChevronRight } from 'react-icons/fa6';
import Button from '../_components/Button';

function Layout({ children }) {
  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col items-center gap-10 mt-14">
      <h2 className="text-3xl font-title font-semibold text-primary-500">
        Ryxel Account
      </h2>
      {children}
      <NavLink href="/forgotPassword">Forgot your password?</NavLink>
      <hr className="w-1/2 border-t border-gray-200 my-1" />
      <div className="flex flex-col items-center gap-4">
        <p>Don't have an account?</p>
        <Button type="primary">Create an account</Button>
      </div>
    </div>
  );
}

export default Layout;
