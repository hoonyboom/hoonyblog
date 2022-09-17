const title = "후니로그";
const description = "고군분투 코딩 생존기";

const SEO = {
  title,
  description,
  canonical: "https://chorok.vercel.app",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://chorok.vercel.app",
    title,
    description,
    images: [
      {
        url: "https://chorok.vercel.app/images/profile.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: "@hyezoprk",
    site: "@hyezoprk",
    cardType: "summary_large_image",
  },
};

export default SEO;
