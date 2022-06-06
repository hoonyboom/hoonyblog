module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '465px',
      md: '768px',
      lg: '1024px',
      xl: '1640px',
    },
    fontSize: {
      // Set in Major Third typescale (1.25)
      base: '1em',
      lg: '1.25em',
      xl: '1.563em',
      '2xl': '1.953em',
      '3xl': '2.441em',
      '4xl': '3.052em',
      '5xl': '3.815em',
    },
  },
  plugins: [],
}
