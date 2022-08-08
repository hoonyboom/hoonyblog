/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  experimental: { images: { allowFutureImage: true } },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/movies", // api 요청 url
  //       destination: "https://www.naver.com/api_keys", // 실제 원출처 api url with MY_API_KEYS
  //       permanent: false,
  //     },
  //   ];
  // },
};
