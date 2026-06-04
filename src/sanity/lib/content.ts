const defineQuery = <const T extends string>(query: T) => query;

export type SanityProduct = {
  _id: string;
  name: string;
  price?: number | null;
  inStock?: boolean | null;
  descriptionText?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
};

export type SanitySeo = {
  title?: string | null;
  description?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  noIndex?: boolean | null;
};

export type SanityPost = {
  _id: string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  body?: Array<Record<string, unknown>> | null;
  bodyText?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  authorName?: string | null;
  authorImage?: string | null;
  categories?: string[] | null;
  seo?: SanitySeo | null;
};

export type SanityService = {
  _id: string;
  title: string;
  slug?: string | null;
  status?: string | null;
  category?: string | null;
  summary?: string | null;
  body?: Array<Record<string, unknown>> | null;
  bodyText?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  priceFrom?: number | null;
  priceText?: string | null;
  duration?: string | null;
  groupSize?: string | null;
  location?: string | null;
  meetingPoint?: string | null;
  season?: string | null;
  bookingMode?: string | null;
  checkinTopicId?: string | null;
  ctaLabel?: string | null;
  faqs?: SanityFaqItem[] | null;
  relatedServices?: Array<{
    _id: string;
    title?: string | null;
    slug?: string | null;
    summary?: string | null;
    imageAlt?: string | null;
    imageUrl?: string | null;
  }> | null;
  seo?: SanitySeo | null;
};

export type SanityFaqItem = {
  _id: string;
  question: string;
  answer?: Array<Record<string, unknown>> | null;
  answerText?: string | null;
  category?: string | null;
  order?: number | null;
};

export type SanityTeamMember = {
  _id: string;
  name: string;
  role?: string | null;
  responsibility?: string | null;
  email?: string | null;
  phone?: string | null;
  bio?: Array<Record<string, unknown>> | null;
  bioText?: string | null;
  imageAlt?: string | null;
  imageUrl?: string | null;
  order?: number | null;
};

export type SanityTestimonial = {
  _id: string;
  quote: string;
  person?: string | null;
  company?: string | null;
  source?: string | null;
  context?: string | null;
  rating?: string | null;
  year?: number | null;
  order?: number | null;
  serviceTitle?: string | null;
  publishedAt?: string | null;
};

export type SanitySiteSettings = {
  title?: string | null;
  description?: string | null;
  siteUrl?: string | null;
  contact?: {
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
  } | null;
  socialLinks?: Array<{ label?: string | null; url?: string | null }> | null;
  defaultSeo?: SanitySeo | null;
};

export type SanityHomePage = {
  title?: string | null;
  hero?: {
    heading?: string | null;
    rotatingWords?: string[] | null;
    intro?: string | null;
    primaryCtaLabel?: string | null;
    primaryCtaHref?: string | null;
    posterImageAlt?: string | null;
    posterImageUrl?: string | null;
    posterImageWidth?: number | null;
    posterImageHeight?: number | null;
  } | null;
  featuredIntro?: {
    eyebrow?: string | null;
    title?: string | null;
  } | null;
  featuredServices?: Array<{
    _id: string;
    title?: string | null;
    slug?: string | null;
    category?: string | null;
    summary?: string | null;
    imageAlt?: string | null;
    imageUrl?: string | null;
    priceText?: string | null;
    priceFrom?: number | null;
  }> | null;
  seo?: SanitySeo | null;
};

const seoProjection = `
  "seo": {
    "title": seo.title,
    "description": seo.description,
    "imageAlt": seo.image.alt,
    "imageUrl": coalesce(seo.image.asset->url, ""),
    "noIndex": seo.noIndex == true
  }
`;

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
  *[_type == "post" && defined(slug.current) && slug.current != ""] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "bodyText": pt::text(body),
    "imageAlt": mainImage.alt,
    "imageUrl": coalesce(mainImage.asset->url, ""),
    "authorName": author->name,
    "categories": categories[]->title,
    ${seoProjection}
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
    "categories": categories[]->title,
    ${seoProjection}
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current != "" && slug.current != $slug] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "imageAlt": mainImage.alt,
    "imageUrl": coalesce(mainImage.asset->url, ""),
    ${seoProjection}
  }
`);

export const allServicesQuery = defineQuery(`
  *[_type == "service" && status == "published"] | order(category asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    status,
    category,
    summary,
    "bodyText": pt::text(body),
    "imageAlt": heroImage.alt,
    "imageUrl": coalesce(heroImage.asset->url, ""),
    "priceFrom": pricing.priceFrom,
    "priceText": pricing.priceText,
    "duration": details.duration,
    "groupSize": details.groupSize,
    "location": details.location,
    "meetingPoint": details.meetingPoint,
    "season": details.season,
    "bookingMode": booking.mode,
    "checkinTopicId": booking.checkinTopicId,
    "ctaLabel": booking.ctaLabel,
    ${seoProjection}
  }
`);

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    category,
    summary,
    body,
    "bodyText": pt::text(body),
    "imageAlt": heroImage.alt,
    "imageUrl": coalesce(heroImage.asset->url, ""),
    "imageWidth": heroImage.asset->metadata.dimensions.width,
    "imageHeight": heroImage.asset->metadata.dimensions.height,
    "priceFrom": pricing.priceFrom,
    "priceText": pricing.priceText,
    "duration": details.duration,
    "groupSize": details.groupSize,
    "location": details.location,
    "meetingPoint": details.meetingPoint,
    "season": details.season,
    "bookingMode": booking.mode,
    "checkinTopicId": booking.checkinTopicId,
    "ctaLabel": booking.ctaLabel,
    faqs[]->{
      _id,
      question,
      answer,
      "answerText": pt::text(answer),
      category,
      order
    },
    relatedServices[]->{
      _id,
      title,
      "slug": slug.current,
      summary,
      "imageAlt": heroImage.alt,
      "imageUrl": coalesce(heroImage.asset->url, "")
    },
    ${seoProjection}
  }
`);

export const allFaqItemsQuery = defineQuery(`
  *[_type == "faqItem"] | order(order asc, question asc) {
    _id,
    question,
    answer,
    "answerText": pt::text(answer),
    category,
    order
  }
`);

export const teamMembersQuery = defineQuery(`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    responsibility,
    email,
    phone,
    bio,
    "bioText": pt::text(bio),
    "imageAlt": image.alt,
    "imageUrl": coalesce(image.asset->url, ""),
    order
  }
`);

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial"] | order(order asc, publishedAt desc) {
    _id,
    quote,
    person,
    company,
    source,
    context,
    rating,
    year,
    order,
    publishedAt,
    "serviceTitle": service->title
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    title,
    description,
    siteUrl,
    contact,
    socialLinks,
    "defaultSeo": {
      "title": defaultSeo.title,
      "description": defaultSeo.description,
      "imageAlt": defaultSeo.image.alt,
      "imageUrl": coalesce(defaultSeo.image.asset->url, ""),
      "noIndex": defaultSeo.noIndex == true
    }
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0] {
    title,
    hero {
      heading,
      rotatingWords,
      intro,
      primaryCtaLabel,
      primaryCtaHref,
      "posterImageAlt": posterImage.alt,
      "posterImageUrl": coalesce(posterImage.asset->url, ""),
      "posterImageWidth": posterImage.asset->metadata.dimensions.width,
      "posterImageHeight": posterImage.asset->metadata.dimensions.height
    },
    featuredIntro {
      eyebrow,
      title
    },
    featuredServices[]->{
      _id,
      title,
      "slug": slug.current,
      category,
      summary,
      "imageAlt": heroImage.alt,
      "imageUrl": coalesce(heroImage.asset->url, ""),
      "priceText": pricing.priceText,
      "priceFrom": pricing.priceFrom
    },
    ${seoProjection}
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
