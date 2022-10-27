module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")], // yarn berry에선 플러그인 위치를 특정해줘야 함
  semi: true,
  tabWidth: 2,
  printWidth: 90,
  trailingComma: "all",
  bracketSameLine: false, // false: jsx에서  /> 를 줄바꿈으로 내림
  arrowParens: "avoid", // avoid: 화살표 함수 괄호 생략될 시 생략
};
