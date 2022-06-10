module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    fontSize: {
      base: "clamp(0.81rem, calc(0.71rem + 0.37vw), 1.00rem);",
      lg: "clamp(1.17rem, calc(0.95rem + 0.77vw), 1.56rem)",
      xl: "clamp(1.40rem, calc(1.09rem + 1.08vw), 1.95rem)",
      xxl: "clamp(1.69rem, calc(1.25rem + 1.48vw), 2.44rem)",
      xxxl: "clamp(1.9rem, calc(1.44rem + 1.67vw), 2.84rem)",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      custom: ["IBM", "Gowun"],
    },
  },
  plugins: [],
};
