import { defineQuery } from "next-sanity";

export type SanityProduct = {
  _id: string;
  name: string;
  price?: number | null;
  inStock?: boolean | null;
  descriptionText?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  bodyText?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  authorName?: string | null;
  categories?: string[] | null;
};

export const productsByIdsQuery = defineQuery(`
  *[_type == "product" && _id in $ids] | order(name asc) {
    _id,
    name,
    price,
    inStock,
    "descriptionText": pt::text(description),
    "imageAlt": image.alt,
    "imageUrl": coalesce(image.asset->url, "")
  }
`);

export const allProductsQuery = defineQuery(`
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    price,
    inStock,
    "descriptionText": pt::text(description),
    "imageAlt": image.alt,
    "imageUrl": coalesce(image.asset->url, "")
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "bodyText": pt::text(body),
    "imageAlt": mainImage.alt,
    "imageUrl": coalesce(mainImage.asset->url, ""),
    "authorName": author->name,
    "categories": categories[]->title
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    body,
    "imageAlt": mainImage.alt,
    "imageUrl": coalesce(mainImage.asset->url, ""),
    "imageWidth": mainImage.asset->metadata.dimensions.width,
    "imageHeight": mainImage.asset->metadata.dimensions.height,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    "categories": categories[]->title
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "imageAlt": mainImage.alt,
    "imageUrl": coalesce(mainImage.asset->url, "")
  }
`);

export function formatNok(value?: number | null) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "";
  }

  return new Intl.NumberFormat("nb-NO").format(value);
}

export function toParagraphs(text?: string | null) {
  if (!text) {
    return [];
  }

  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function excerpt(text?: string | null, maxLength = 180) {
  if (!text) {
    return "";
  }

  const collapsed = text.replace(/\s+/g, " ").trim();
  if (collapsed.length <= maxLength) {
    return collapsed;
  }

  return `${collapsed.slice(0, maxLength).trimEnd()}…`;
}
