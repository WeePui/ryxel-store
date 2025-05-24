import { Metadata } from "next";
import TermsOfServiceTranslated from "@/app/_components/TermsOfService/TermsOfServiceTranslated";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service of Ryxel Store.",
};

export default function TermsPage() {
  return <TermsOfServiceTranslated />;
}
