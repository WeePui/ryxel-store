'use client';

import Button from '@/app/_components/UI/Button';

function Error({ error, reset }) {
  return (
    <div className="h-screen">
      <div className="flex h-1/2 flex-col items-center justify-center gap-8">
        <h1 className="text-3xl">Oopsie! Something went wrong!</h1>
        <p>{error.message}</p>
        <div className="flex items-center gap-6">
          <Button type="secondary" onClick={reset}>
            Try again
          </Button>
          <span>Or</span>

          <Button type="primary" href="/">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
