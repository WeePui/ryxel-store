import { Metadata } from "next";
import ContactTranslated from "@/app/_components/Contact/ContactTranslated";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ryxel Store.",
};

export default function ContactPage() {
  return <ContactTranslated />;
}
