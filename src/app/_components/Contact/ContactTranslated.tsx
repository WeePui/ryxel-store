"use client";

import NavLink from "../../_components/UI/NavLink";
import { FaChevronRight } from "react-icons/fa6";
import { useLanguage } from "@/app/_contexts/LanguageContext";
import { Fragment } from "react/jsx-runtime";

export default function ContactTranslated() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto mt-14 flex w-full max-w-7xl flex-col gap-10 xl:px-6 lg:mt-4">
      <div>
        <h1 className="font-title text-3xl font-semibold text-primary-500">
          {t("contact.title")}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-grey-400">
          <NavLink href="/">
            <span className="text-grey-400">{t("header.shop")}</span>
          </NavLink>
          <FaChevronRight className="text-xs" />
          <span className="text-primary-500">{t("contact.title")}</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col gap-6 text-left text-grey-700">
        <div className="flex flex-col gap-4">
          <h2 className="font-title text-4xl font-bold tracking-wide text-primary-500">
            {t("contact.subtitle")}
          </h2>
          <p className="font-semibold">{t("contact.description")}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">
            {t("contact.contactMethods.title")}
          </h3>
          <p className="font-medium">
            {t("contact.contactMethods.description")}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">
            {t("contact.generalInquiries.title")}
          </h3>
          <p className="font-medium">
            {t("contact.generalInquiries.description")
              .split("info@ryxelstore.com")
              .map((text, i, array) =>
                i === array.length - 1 ? (
                  <span key={i}>{text}</span>
                ) : (
                  <Fragment key={i}>
                    <span>{text}</span>
                    <NavLink
                      type="mainNavInline"
                      href="mailto:info@ryxelstore.com"
                    >
                      <span className="border-b-[1px]">
                        <strong>info@ryxelstore.com</strong>
                      </span>
                    </NavLink>
                  </Fragment>
                ),
              )}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">
            {t("contact.technicalSupport.title")}
          </h3>
          <p className="font-medium">
            {t("contact.technicalSupport.description")
              .replace("(+84) 912 823 83", "{phone}")
              .replace("support@ryxelstore.com", "{email}")
              .split("{phone}")
              .map((text, i, array) =>
                i === array.length - 1 ? (
                  text.split("{email}").map((subText, j, subArray) =>
                    j === subArray.length - 1 ? (
                      <span key={`subtext-${j}`}>{subText}</span>
                    ) : (
                      <>
                        <span key={`subtext-${j}`}>{subText}</span>
                        <NavLink
                          key={`email-${j}`}
                          type="mainNavInline"
                          href="mailto:support@ryxelstore.com"
                        >
                          <span className="border-b-[1px]">
                            <strong>support@ryxelstore.com</strong>
                          </span>
                        </NavLink>
                      </>
                    ),
                  )
                ) : (
                  <>
                    <span key={`text-${i}`}>{text}</span>
                    <NavLink
                      key={`phone-${i}`}
                      type="mainNavInline"
                      href="tel:+8491282383"
                    >
                      <span className="border-b-[1px]">
                        <strong>(+84) 912 823 83</strong>
                      </span>
                    </NavLink>
                  </>
                ),
              )}
          </p>
        </div>
      </div>
    </div>
  );
}
