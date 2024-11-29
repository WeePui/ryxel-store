import Image from 'next/image';
import Logo from './Logo';
import NavLink from './NavLink';

import SocialNavigation from './SocialNavigation';
import { FaCcMastercard, FaCcVisa, FaStripe } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="mt-24 flex w-full flex-col items-center bg-primary-default text-white">
      <div className="flex w-full max-w-7xl justify-center">
        <div className="justify-items-between grid grid-cols-4 gap-x-10 px-12">
          <FooterColumn title="Ryxel Company">
            <li>
              <NavLink type="" href="/about">
                About us
              </NavLink>
            </li>
            <li>
              <NavLink type="" href="/terms">
                Terms of service
              </NavLink>
            </li>
            <li>
              <NavLink type="" href="/privacy">
                Privacy policy
              </NavLink>
            </li>
          </FooterColumn>
          <FooterColumn title="Contact us">
            <li>Open hours: 8:00 am - 5:00 pm (GMT +7)</li>
            <li className="flex gap-2">
              Phone no.
              <NavLink type="" href="tel:+8491282383">
                <span className="border-b-[1px]">+84 912 823 83</span>
              </NavLink>
            </li>
            <li className="flex gap-2">
              E-mail:
              <NavLink type="" href="mailto:bhtcag@gmail.com">
                <span className="border-b-[1px]">bhtcag@gmail.com</span>
              </NavLink>
            </li>
          </FooterColumn>
          <div>
            <FooterColumn title="Payment">
              <div className="grid w-36 grid-cols-3 gap-2 text-5xl">
                <FooterPaymentMethods />
              </div>
            </FooterColumn>
            <FooterColumn title="Follow us">
              <SocialNavigation />
            </FooterColumn>
          </div>
          <FooterColumn title="Download our app">
            <Image
              src="/mobile-app-qrcode.png"
              alt="Ryxel mobile app downloading QR-code"
              width={160}
              height={160}
              className="object-fit rounded-xl"
            />
          </FooterColumn>
        </div>
      </div>
      <div className="mx-auto py-4 text-sm">
        <p className="text-gray-default text-center">
          © 2024 Ryxel Store. All rights reserved. Ryxel Inc. Headquarters are
          in Ho Chi Minh City, Vietnam.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div className="my-12 flex flex-col">
      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
      <ul className="text-gray-default flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterPaymentMethods() {
  return (
    <>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/stripe.png"
          alt="stripe payment method"
          className="object-fit"
          fill
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/visa.png"
          alt="visa payment method"
          className="object-fit"
          fill
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/mastercard.png"
          alt="mastercard payment method"
          className="object-fit"
          fill
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/zalopay.png"
          alt="zalopay payment method"
          className="object-fit"
          fill
        />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="/cod.png"
          alt="cod payment method"
          className="object-fit"
          fill
        />
      </div>
    </>
  );
}

export default Footer;
