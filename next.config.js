/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/tags/블로그%20포트폴리오",
        permanent: false,
      },
      {
        source: "/me",
        destination: "/tags/일기",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "https://hyezoprk.com/api/graphql",
      },
    ];
  },
};
