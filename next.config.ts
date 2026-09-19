import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  async redirects() {
    return [
      // L'ancienne rubrique /blog a été renommée /actualites — on préserve
      // les liens existants (SEO, newsletters déjà envoyées, partages).
      { source: "/blog", destination: "/actualites", permanent: true },
      {
        source: "/blog/:slug",
        destination: "/actualites/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
