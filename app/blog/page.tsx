import { BlogHeroSection } from "@/components/content/blog/BlogHeroSection";
import { BlogListSection } from "@/components/content/blog/BlogListSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Actualités - FEMCOEUR",
  description:
    'Analyses d\'expertes, témoignages de patientes et veille scientifique pour que la "cardiologie des femmes" soit au cœur des pratiques.',
};

export default function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <BlogListSection />
    </>
  );
}
