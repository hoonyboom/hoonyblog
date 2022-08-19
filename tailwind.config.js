module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./drafts/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionDuration: {
        3000: "3000ms",
      },
      KeyframeEffect: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    fontSize: {
      sm: "clamp(0.67rem, calc(0.59rem + 0.22vw), 0.76rem);",
      base: "clamp(0.81rem, calc(0.71rem + 0.37vw), 0.92rem);",
      md: "clamp(0.84rem, calc(0.73rem + 0.39vw), 1.02rem);",
      lg: "clamp(1.17rem, calc(0.95rem + 0.77vw), 1.56rem)",
      xl: "clamp(1.40rem, calc(1.09rem + 1.08vw), 1.95rem)",
      "2xl": "clamp(1.69rem, calc(1.25rem + 1.48vw), 2.44rem)",
      "3xl": "clamp(1.9rem, calc(1.44rem + 1.67vw), 2.84rem)",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["Consolas", "ui-monospace", "SFMono-Regular"],
      custom: ["IBM", "NanumSquareR"],
    },
    minHeight: {
      content: "100vh",
    },
  },
  plugins: [],
};
