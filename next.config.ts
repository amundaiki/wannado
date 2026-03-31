import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/kulturvandring-med-sjarmerende-treskoyte',
        destination: '/seilturer',
        permanent: true,
      },
      {
        source: '/kajakk-turer-og-ekspedisjoner',
        destination: '/kajakkturer',
        permanent: true,
      },
      {
        source: '/kurs/kajakkurs',
        destination: '/kajakkturer',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
