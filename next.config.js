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
  // async rewrites() {
  //   return [
  //     {
  //       source: "/category/coding", // api 요청 url
  //       destination: "/coding", // 실제 원출처 api url with MY_API_KEYS
  //     },
  //   ];
  // },
};
