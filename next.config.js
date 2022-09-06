/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  async redirects() {
    return [
      {
        source: "/coding",
        destination: "/",
        permanent: false,
      },
      {
        source: "/writing",
        destination: "/",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/category/about",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/fonts/Arita.woff2",
        destination: "/404",
      },
      {
        source: "/fonts/LeferiPointSpecial.woff2",
        destination: "/404",
      },
      {
        source: "/fonts/NunitoSans-Regular.woff2",
        destination: "/404",
      },
      {
        source: "/fonts/IBMPlexMono-Regular.woff2",
        destination: "/404",
      },
    ];
  },
};
