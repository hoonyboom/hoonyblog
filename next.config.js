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
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules[3].oneOf.forEach((moduleLoader, i) => {
      Array.isArray(moduleLoader.use) &&
        moduleLoader.use.forEach(l => {
          if (l.loader.includes("\\css-loader") && !l.loader.includes("postcss-loader")) {
            const { getLocalIdent, ...others } = l.options.modules;
            l.options = {
              ...l.options,
              modules: {
                ...others,
                localIdentName: "[hash:base64:6]",
              },
            };
          }
        });
    });
    return config;
  },
};
