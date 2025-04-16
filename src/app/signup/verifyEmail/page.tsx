import ResendOTP from '@/app/_components/ResetPassword/ResendOTP';
import OTPInput from '@/app/_components/ResetPassword/OTPInput';
import { FaCircleInfo } from 'react-icons/fa6';

export const metadata = {
  title: 'Xác thực tài khoản',
  description: 'Xác thực tài khoản của bạn',
};

async function page() {
  return (
    <div className="mx-auto my-auto flex max-w-7xl flex-col items-center justify-center gap-8 pt-32 lg:pt-16 xl:px-6">
      <h1 className="text-3xl font-bold text-primary-500">Chỉ một chút nữa</h1>
      <div className="text-center text-grey-default">
        <p>
          Chúng tôi đã gửi e-mail có chứa OTP tới địa chỉ e-mail của bạn. Xin
          lưu ý OTP chỉ có tác dụng trong 10 phút.
        </p>
        <p>Xin hãy nhập OTP dưới đây:</p>
      </div>
      <OTPInput />
      <ResendOTP />
      <p className="my-2 flex items-center gap-2 text-sm text-grey-300">
        <span>
          <FaCircleInfo />
        </span>
        Bạn đã đăng nhập thành công. Nhưng bạn sẽ không thể tiến hành đặt hàng
        nếu chưa xác nhận tài khoản.
      </p>
    </div>
  );
}

export default page;
