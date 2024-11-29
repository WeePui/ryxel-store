import ResendOTP from '@/app/_components/ResendOTP';
import OTPInput from '@components/OTPInput';
import { FaCircleInfo } from 'react-icons/fa6';

async function page() {
  return (
    <div className="mx-auto my-auto flex max-w-7xl flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold text-primary-500">One more step</h1>
      <div className="text-center text-grey-default">
        <p>
          We have sent an email contains OTP to verify your email account. It's
          only valid for 10 minutes.
        </p>
        <p>Please enter the OTP below.</p>
      </div>
      <OTPInput />
      <ResendOTP />
      <p className="my-2 flex items-center gap-2 text-sm text-grey-300">
        <span>
          <FaCircleInfo />
        </span>
        You are already logged in with new account. But without verifying the
        email you can't do any order.
      </p>
    </div>
  );
}

export default page;
