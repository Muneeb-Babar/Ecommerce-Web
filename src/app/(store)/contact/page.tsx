import type { Metadata } from "next";
import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the NOVA team — we reply within 24 hours, 7 days a week.",
};

export default function ContactPage() {
  return <ContactView />;
}