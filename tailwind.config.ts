import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        schoolSky: "#a2e1fa",
        schoolSkyLight: "#e5f7fd",
        schoolSkyDark: "#8bb8cf",
        schoolGreen: "#a8eac1",
        schoolGreenLight: "#dff5ec",
        schoolGreenDark: "#7cc9a2",
        schoolOrange: "#ffe0b2",
        schoolOrangeLight: "#fff5eb",
        schoolPurple: "#e0c1fc",
        schoolPurpleDark: "#b58eff",
        schoolPurpleLight: "#f2eaff",
        schoolRed: "#ff9b9b",
        schoolRedLight: "#ffe9e9",
      },
      screens: {
        xs: "500px",
      },
    },
  },
  safelist: [
    "bg-schoolRed",
    "bg-schoolRedLight",
    "bg-schoolGreen",
    "bg-schoolGreenDark",
    "bg-schoolGreenLight",
    "bg-schoolSky",
    "bg-schoolSkyDark",
    "bg-schoolSkyLight",
    "bg-schoolPurple",
    "bg-schoolPurpleDark",
    "bg-schoolPurpleLight",
    "bg-schoolOrange",
    "bg-schoolOrangeLight",
  ],
  plugins: [],
};
export default config;
