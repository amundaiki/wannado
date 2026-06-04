import type { Metadata } from "next";

export const siteUrl = "https://wannado.no";
export const siteName = "Wannado";

export const defaultOgImage = {
  url: "/images/baat-fb.jpg",
  width: 1200,
  height: 630,
  alt: "Wannado - opplevelser i Arendals skjærgård",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  noIndex?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

export type BreadcrumbItem = {
  name: string;
  path: `/${string}`;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function normalizePageTitle(title: string) {
  return title.replace(/\s*(?:\||-)\s*Wannado\s*$/i, "");
}

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultOgImage.url,
  imageAlt = defaultOgImage.alt,
  imageWidth = 1200,
  imageHeight = 630,
  noIndex = false,
  ogType = "website",
  publishedTime,
  authors,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const normalizedTitle = normalizePageTitle(title);

  return {
    title: normalizedTitle,
    description,
    robots: noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: ogType,
      ...(ogType === "article" && publishedTime
        ? { publishedTime, authors }
        : {}),
      locale: "nb_NO",
      siteName,
      title: normalizedTitle,
      description,
      url,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description,
      images: [image],
    },
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  const normalizedItems =
    items[0]?.path === "/"
      ? items
      : [{ name: "Forside", path: "/" as const }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "TravelAgency"],
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: absoluteUrl("/images/wannado-logo.svg"),
      image: absoluteUrl(defaultOgImage.url),
      email: "mail@wannado.no",
      telephone: "+4799469957",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Skarestrand 11",
        postalCode: "4812",
        addressLocality: "Kongshavn",
        addressRegion: "Agder",
        addressCountry: "NO",
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Arendal",
        },
        {
          "@type": "AdministrativeArea",
          name: "Sørlandet",
        },
      ],
      sameAs: ["https://www.facebook.com/wannado.no/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "nb-NO",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
} as const;
