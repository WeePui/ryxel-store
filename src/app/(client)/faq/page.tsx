import { Metadata } from "next";
import FAQTranslated from "../../_components/FAQ/FAQTranslated";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently Asked Questions about Ryxel Store.",
};

export default function FAQPage() {
  return <FAQTranslated />;
}
