import type { Metadata } from "next";
import { AboutView } from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about NOVA — the team, our curation philosophy, and our promise to you.",
};

export default function AboutPage() {
  return <AboutView />;
}