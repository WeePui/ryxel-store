import { Metadata } from "next";
import PrivacyPolicyTranslated from "@/app/_components/PrivacyPolicy/PrivacyPolicyTranslated";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of Ryxel Store.",
};

export default function PrivacyPage() {
  return <PrivacyPolicyTranslated />;
}
