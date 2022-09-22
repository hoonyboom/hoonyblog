import Head from "next/head";

export default function Seo({ siteTitle }: { siteTitle?: string }) {
  return (
    <Head>
      <title>{siteTitle}</title>
      <link rel="icon" href="/images/2022/summer/heart.svg" />
      <link rel="apple-touch-icon" href="/images/2022/summer/heart.svg" />
      <link rel="mask-icon" href="/images/2022/summer/heart.svg" />
      <link rel="canonical" href="https://hyezoprk.com/" />,
      <meta name="description" content="프론트엔드 취준생 블로그" />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          "후니로그",
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:url" content="https://chorok.vercel.app" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="all" />
    </Head>
  );
}
