import Image from 'next/image';
import NavLink from '../UI/NavLink';

import SocialNavigation from './SocialNavigation';
import PaymentMethods from '../UI/PaymentMethods';

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function Footer() {
  return (
    <footer className="mt-24 flex w-full flex-col items-center bg-primary-default text-white">
      <div className="flex w-full max-w-7xl justify-center">
        <div className="justify-items-between grid grid-cols-4 gap-x-10 px-12">
          <FooterColumn title="Ryxel Company">
            <li>
              <NavLink type="footerNav" href="/about">
                Về chúng tôi
              </NavLink>
            </li>
            <li>
              <NavLink type="footerNav" href="/terms-of-service">
                Điều khoản và Dịch vụ
              </NavLink>
            </li>
            <li>
              <NavLink type="footerNav" href="/privacy-policy">
                Chính sách bảo mật
              </NavLink>
            </li>
            <li>
              <NavLink type="footerNav" href="/faq">
                FAQ
              </NavLink>
            </li>
          </FooterColumn>
          <FooterColumn title="Liên hệ">
            <li>Giờ làm việc: 8:00 - 17:00 (GMT +7)</li>
            <li className="flex gap-2">
              SĐT:
              <NavLink type="footerNav" href="tel:+8491282383">
                <span className="border-b-[1px]">(+84) 912 823 83</span>
              </NavLink>
            </li>
            <li className="flex gap-2">
              E-mail:
              <NavLink type="footerNav" href="mailto:bhtcag@gmail.com">
                <span className="border-b-[1px]">bhtcag@gmail.com</span>
              </NavLink>
            </li>
          </FooterColumn>
          <div>
            <FooterColumn title="Thanh toán">
              <div className="grid w-36 grid-cols-3 gap-2 text-5xl">
                <PaymentMethods />
              </div>
            </FooterColumn>
            <FooterColumn title="Theo dõi chúng tôi">
              <SocialNavigation />
            </FooterColumn>
          </div>
          <FooterColumn title="Ứng dụng di động">
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
          © 2025 Ryxel Store. All rights reserved. Ryxel Inc. Headquarters are
          in Ho Chi Minh City, Vietnam.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="my-12 flex flex-col">
      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
      <ul className="text-gray-default flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export default Footer;
