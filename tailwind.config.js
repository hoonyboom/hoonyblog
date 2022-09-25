/** @type {import('tailwindcss').Config} */
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
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        swap: {
          "50%": { transform: "translateY(50px)" },
          "100%": { transform: "translateY(-250px)", opacity: 0 },
        },
        swapReverse: {
          "0%": { transform: "translateY(150px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        swap: "swap 0.8s ease-in-out",
        swapReverse: "swapReverse 0.8s ease-in-out",
      },
      colors: {
        waterMelon: "#ED4C6A",
        orange: "#ffa500",
        sea: "#0984e3fe",
        paleBlue: "rgb(102, 153, 204)",
        lightGray: "#EAECEF",
        darkGray: "#363636",
        smokeWhite: "#F6FAFA",
        smokeBlack: "#1E1E1E",
        salary: "#CAFC9D",
        darkslateblue: "darkslateblue",
      },
      cursor: {
        fancy: "url('/images/2022/autumm/cursor.png'), default",
        fancyHover: "url('/images/2022/autumm/cursor_hover.png'), pointer",
      },
      scrollPadding: {
        vmax: "14vmax",
      },
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    fontSize: {
      sm: "clamp(0.67rem, calc(0.59rem + 0.22vw), 0.76rem);",
      mono: "clamp(0.76rem, calc(0.63rem + 0.26vw), 0.85rem);",
      base: "clamp(0.81rem, calc(0.69rem + 0.33vw), 0.97rem);",
      md: "clamp(0.9rem, calc(0.82rem + 0.55vw), 1.22rem);",
      lg: "clamp(1.17rem, calc(0.95rem + 0.88vw), 1.76rem)",
      xl: "clamp(1.40rem, calc(1.09rem + 1.08vw), 1.95rem)",
      "2xl": "clamp(1.69rem, calc(1.25rem + 1.48vw), 2.44rem)",
      "3xl": "clamp(1.9rem, calc(1.44rem + 1.67vw), 2.84rem)",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      heading: ["LeferiPointSpecial"],
      content: ["NunitoSans", "Arita"],
      grapeNuts: ["GrapeNuts"],
    },
    minHeight: {
      content: "100vh",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      circle: "circle",
      roman: "upper-roman",
    },
  },
  plugins: [],
};
