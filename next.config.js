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
      // {
      //   source: "/?category=coding",
      //   destination: "/coding",
      // },
      // {
      //   source: "/?category=writing",
      //   destination: "/writing",
      // },
    ];
  },
};
