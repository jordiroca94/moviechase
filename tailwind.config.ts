import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        white: "#ffffff",
        darkGray: "#191919",
        mediumGray: "#484547",
        lightGray: "#D3D3D3",
        primary: "#0d253f",
        secondary: "#90cea1",
        red: "#ff0000",
      },
      margin: {
        header: "74px",
      },
    },
  },
  plugins: [],
};
export default config;
