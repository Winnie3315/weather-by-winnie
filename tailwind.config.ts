import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'bg-main': 'linear-gradient(192.05deg, #47BFDF 0%, #4A91FF 100%)'
      },
      screens:{
        xs: { min: "280px", max: "639px" }
      }
    },
  },
  plugins: [],
};
export default config;
