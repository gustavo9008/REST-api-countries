import plugin from "tailwindcss/plugin";
const colors = require('tailwindcss/colors')

export const mode = "jit";
export const content = [
  `/components/**/*.{vue,js,ts}`,
  `/layouts/**/*.vue`,
  `/pages/**/*.vue`,
  `/composables/**/*.{js,ts}`,
  `/plugins/**/*.{js,ts}`,
  `/utils/**/*.{js,ts}`,
  `/App.{js,ts,vue}`,
  `/app.{js,ts,vue}`,
  `/Error.{js,ts,vue}`,
  `/error.{js,ts,vue}`,
  `/app.config.{js,ts}`
];
export const theme = {
  darkMode: "class",
  maxHeight: {
    "1/2": "40rem",
  },
  screens: {
    Psm: { min: "300px", max: "760px" },
    xsm: "450px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    black: colors.black,
    white: colors.white,
    gray: colors.gray,
    slate: colors.slate,
    blue: colors.blue,
    country: {
      darkBlue: "hsl(209, 23%, 22%)",
      veryDarkBlue: "hsl(207, 26%, 17%)",
      veryDarkBlueText: "hsl(200, 15%, 8%)",
      darkGray: "hsl(0, 0%, 52%)",
      veryLightGray: "hsl(0, 0%, 98%)",
      white: "hsl(0,0%,100%)"
    }
  }
};
export const variants = {
  extend: {},
};
export const plugins = [require('@tailwindcss/aspect-ratio'),];
