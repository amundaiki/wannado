import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
