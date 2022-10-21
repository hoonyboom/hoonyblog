/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "k.kakaocdn.net", "pbs.twimg.com"],
  },
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
};
