/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
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
    return [];
  },
};
