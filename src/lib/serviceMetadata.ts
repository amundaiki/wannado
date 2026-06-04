import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import {
  serviceBySlugQuery,
  type SanityService,
} from "@/sanity/lib/content";

type ServiceMetadataFallback = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

type ServiceMetadataInput = {
  slug: string;
  path: `/${string}`;
  fallback: ServiceMetadataFallback;
};

function withoutBrandSuffix(title: string) {
  return title.replace(/\s*\|\s*Wannado(?:\s+Arendal)?\s*$/i, "");
}

export async function createServicePageMetadata({
  slug,
  path,
  fallback,
}: ServiceMetadataInput): Promise<Metadata> {
  try {
    const { data: service } = await sanityFetch({
      query: serviceBySlugQuery,
      params: { slug },
      perspective: "published",
    });

    const serviceData = service as SanityService | null;
    const seo = serviceData?.seo;

    return createPageMetadata({
      title: withoutBrandSuffix(seo?.title || serviceData?.title || fallback.title),
      description: seo?.description || serviceData?.summary || fallback.description,
      path,
      image: seo?.imageUrl || serviceData?.imageUrl || fallback.image,
      imageAlt: seo?.imageAlt || serviceData?.imageAlt || fallback.imageAlt,
      noIndex: seo?.noIndex ?? false,
    });
  } catch {
    return createPageMetadata({
      title: fallback.title,
      description: fallback.description,
      path,
      image: fallback.image,
      imageAlt: fallback.imageAlt,
    });
  }
}
