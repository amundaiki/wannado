import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 streamer som standard metadata (title, description, keywords) inn i
  // <body> for vanlige nettlesere, og sender den kun blokkerende i <head> for UA-er
  // som matcher htmlLimitedBots. Enkle crawlere og SEO-verktoy parser kun statisk
  // <head> og ser da hverken title eller meta description; deferred innhold (for
  // eksempel footer-lenker bak en Suspense-grense) havner i tillegg utenfor sitt <ul>.
  // Mange crawlere og SEO-verktoy spoofer dessuten en vanlig Chrome-UA (Mozilla/...),
  // saa token som "bot"/"crawler" treffer dem ikke.
  // Denne siden er en statisk markedsside der metadata genereres umiddelbart, saa
  // streaming gir ingen ytelsesgevinst. Vi matcher derfor "Mozilla" (alle nettlesere
  // og de fleste crawlere) slik at metadata og markup alltid rendres blokkerende i <head>.
  htmlLimitedBots:
    /Mozilla|SquirrelScan|[\w-]+-Google|Google-[\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight|bot|crawler|spider|crawling/i,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/hesteopplevelser',
        destination: '/opplevelser/hesteopplevelser',
        permanent: true,
      },
      {
        source: '/kulturvandring-med-sjarmerende-treskoyte',
        destination: '/seilturer',
        permanent: true,
      },
      {
        source: '/opplevelser/seiltur',
        destination: '/seilturer',
        permanent: true,
      },
      {
        source: '/kajakk-turer-og-ekspedisjoner',
        destination: '/kajakkturer',
        permanent: true,
      },
      {
        source: '/kajakktur-fra-fyr-til-fyr',
        destination: '/kajakkturer',
        permanent: true,
      },
      {
        source: '/opplevelser/kajakk',
        destination: '/kajakkturer',
        permanent: true,
      },
      {
        source: '/adopter-en-strand',
        destination: '/opplevelser',
        permanent: true,
      },
      {
        source: '/menneskene',
        destination: '/om-oss',
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
