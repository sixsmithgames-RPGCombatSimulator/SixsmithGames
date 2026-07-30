import type { MetadataRoute } from "next";

/**
 * Purpose: Prevents indexing of every private operations route.
 * Parameters: None.
 * Returns: A MetadataRoute robots policy that disallows all crawlers.
 * Side effects: Generates `/robots.txt` during the Next.js build.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
