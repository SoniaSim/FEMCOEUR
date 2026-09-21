import { CANONICAL_ORIGIN } from "@/lib/site-url";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
  };
}
