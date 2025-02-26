import Image from 'next/image';

function PaymentMethods() {
  return (
    <>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/stripe.png"
          alt="stripe payment method"
          className="object-fit"
          fill
          sizes="100%"
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/visa.png"
          alt="visa payment method"
          className="object-fit"
          fill
          sizes="100%"
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/mastercard.png"
          alt="mastercard payment method"
          className="object-fit"
          fill
          sizes="100%"
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/zalopay.png"
          alt="zalopay payment method"
          className="object-fit"
          fill
          sizes="100%"
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/cod.png"
          alt="cod payment method"
          className="object-fit"
          fill
          sizes="100%"
        />
      </div>
    </>
  );
}

export default PaymentMethods;
