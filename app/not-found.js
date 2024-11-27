import Image from 'next/image';
import Button from '@components/Button';

function NotFound() {
  return (
    <div className="mb-32 mt-14 flex w-full flex-col items-center gap-10">
      <div className="relative h-64 w-full">
        <Image src="/404.svg" alt="404" layout="fill" objectFit="contain" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-title text-4xl font-bold uppercase text-primary-default">
          Oopsie !!!
        </h2>
        <p>The things you're looking for cannot be found!</p>
        <p>You might want to try searching again or</p>
        <Button type="primary" href="/">
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
