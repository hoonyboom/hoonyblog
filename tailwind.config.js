module.exports = {
  content: [
    "/src/pages/**/*.{js,ts,jsx,tsx}",
    "/src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '465px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    fontSize: {
      base: 'clamp(0.75rem, calc(0.63rem + 0.41vw), 1.00rem)',
      lg: 'clamp(0.84rem, calc(0.65rem + 0.67vw), 1.25rem)',
      xl: 'clamp(0.95rem, calc(0.66rem + 1.01vw), 1.56rem)',
    },
  },
  plugins: [],
}
