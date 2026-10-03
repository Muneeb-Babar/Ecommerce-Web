import type { Metadata } from "next";
import { categories } from "@/data/content";
import { CategoryGrid } from "@/components/category/category-grid";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Browse Categories",
  description:
    "Explore all product categories — electronics, fashion, home & living, sports, beauty and accessories.",
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Find your world"
        title="Browse categories"
        description="From wall-to-wall audio to artisan ceramics and everything between — pick a world and dive in."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />
      <CategoryGrid categories={categories} />
    </>
  );
}