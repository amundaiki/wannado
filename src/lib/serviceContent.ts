import { sanityFetch } from "@/sanity/lib/live";
import { serviceBySlugQuery, type SanityService } from "@/sanity/lib/content";

export async function getServiceBySlug(slug: string) {
  try {
    const { data } = await sanityFetch({
      query: serviceBySlugQuery,
      params: { slug },
      perspective: "published",
    });

    return data as SanityService | null;
  } catch {
    return null;
  }
}
