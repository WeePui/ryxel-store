"use client";

import Image from "next/image";
import NavLink from "../UI/NavLink";

import SocialNavigation from "./SocialNavigation";
import PaymentMethods from "../UI/PaymentMethods";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function Footer() {
  return (
    <footer className="mt-24 lg:mt-12 flex w-full flex-col items-center bg-primary-default text-white">
      <div className="flex w-full max-w-7xl justify-center lg:justify-start lg:px-12">
        <div className="justify-items-between grid grid-cols-4 lg:grid-cols-2 md:grid-cols-1 gap-x-10 px-12 md:px-2 lg:gap-8 lg:gap-y-2 py-12">
          <FooterColumn title="Ryxel Company">
            <li>
              <NavLink type="footerNav" href="/about-us">
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
          <div className="lg:flex lg:flex-col lg:gap-2 lg:w-full">
            <FooterColumn title="Thanh toán">
              <div className="grid w-36 grid-cols-3 gap-2 text-5xl md:max-w-none">
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-12 lg:my-0 w-full md:w-auto">
      <button
        className="flex w-full items-center justify-between pointer-events-none lg:pointer-events-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`footer-col-${title}`}
      >
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <FaChevronCircleRight
          className={`ml-2 h-5 w-5 transform transition-transform hidden lg:block ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <ul
        id={`footer-col-${title}`}
        className={`
          text-gray-default flex flex-col gap-2 mt-4 
          transition-all duration-300 ease-in-out ml-4
          ${
            isOpen
              ? "lg:max-h-[500px] lg:opacity-100 lg:overflow-visible"
              : "lg:max-h-0 lg:opacity-0 lg:overflow-hidden"
          }
        `}
      >
        {children}
      </ul>
    </div>
  );
}

export default Footer;
