"use client";

import Image from "next/image";
import NavLink from "../UI/NavLink";
import SocialNavigation from "./SocialNavigation";
import PaymentMethods from "../UI/PaymentMethods";
import { useState } from "react";
import { FaChevronCircleRight } from "react-icons/fa";
import { useLanguage } from "@/app/_contexts/LanguageContext";

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 flex w-full flex-col items-center bg-primary-default text-white lg:mt-12">
      <div className="flex w-full max-w-7xl justify-center lg:justify-start lg:px-12">
        <div className="justify-items-between grid grid-cols-4 gap-x-10 px-12 py-12 lg:grid-cols-2 lg:gap-8 lg:gap-y-2 md:grid-cols-1 md:px-2">
          <FooterColumn title={t("footer.company")}>
            <li>
              <NavLink type="footerNav" href="/about-us">
                {t("footer.aboutUs")}
              </NavLink>
            </li>
            <li>
              <NavLink type="footerNav" href="/terms-of-service">
                {t("footer.terms")}
              </NavLink>
            </li>
            <li>
              <NavLink type="footerNav" href="/privacy-policy">
                {t("footer.privacy")}
              </NavLink>
            </li>
            <li>
              <NavLink type="footerNav" href="/faq">
                {t("footer.faq")}
              </NavLink>
            </li>
          </FooterColumn>
          <FooterColumn title={t("footer.contact")}>
            <li>{t("footer.workingHours")}: 8:00 - 17:00 (GMT +7)</li>
            <li className="flex gap-2">
              {t("footer.phone")}:
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
          <div className="lg:flex lg:w-full lg:flex-col lg:gap-2">
            <FooterColumn title={t("footer.payment")}>
              <div className="grid w-36 grid-cols-3 gap-2 text-5xl md:max-w-none">
                <PaymentMethods />
              </div>
            </FooterColumn>
            <FooterColumn title={t("footer.followUs")}>
              <SocialNavigation />
            </FooterColumn>
          </div>
          <FooterColumn title={t("footer.mobileApp")}>
            <Image
              src="/mobile-app-qrcode.png"
              alt={t("footer.mobileAppQR")}
              width={160}
              height={160}
              className="object-fit rounded-xl"
            />
          </FooterColumn>
        </div>
      </div>
      <div className="mx-auto py-4 text-sm">
        <p className="text-gray-default text-center">
          © 2025 Ryxel Store. {t("footer.allRights")}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: FooterColumnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-12 w-full lg:my-0 md:w-auto">
      <button
        className="pointer-events-none flex w-full items-center justify-between lg:pointer-events-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`footer-col-${title}`}
      >
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <FaChevronCircleRight
          className={`hidden transform text-xl text-white transition-transform duration-200 lg:block ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </button>
      <ul
        id={`footer-col-${title}`}
        className={`mt-4 flex flex-col gap-3 lg:mt-2 ${isOpen ? "" : "lg:hidden"}`}
      >
        {children}
      </ul>
    </div>
  );
}

export default Footer;
