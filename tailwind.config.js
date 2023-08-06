import plugin from "tailwindcss/plugin";

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
  extend: {
    backgroundImage: {
      'gradientDark': `linear-gradient( 94.3deg, rgb(30, 31, 39) 10.9%, rgb(38, 38, 40) 87.1% );`,
      'gradientLight': `linear-gradient( 94.3deg,  rgb(226, 226, 226) 10.9%, rgb(255, 255, 255) 87.1% );`
    }
  },
};
export const variants = {
  extend: {},
};
export const plugins = [require('@tailwindcss/aspect-ratio'),];
