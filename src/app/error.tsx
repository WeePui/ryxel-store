'use client';

import Button from '@components/UI/Button';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: ErrorProps) {
  return (
    <div className="h-screen">
      <div className="flex h-1/2 flex-col items-center justify-center gap-8">
        <h1 className="text-3xl">Oopsie! Có gì không ổn rồi!</h1>
        <p>{error.message}</p>
        <div className="flex items-center gap-6">
          <Button type="secondary" onClick={reset}>
            Thử lại
          </Button>
          <span>hoặc</span>

          <Button type="primary" href="/">
            Trở về Trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Error;
