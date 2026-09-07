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
        navy: "#0B132B",
        teal: "#14B8A6",
        cream: "#FBF9F5",
        gold: {
          DEFAULT: "#D4AF37",
          hover: "#B8962E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
