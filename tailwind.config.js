/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF0DA",
        foreground: "#4B87C5",
        foregroundlight: "#8EA9C9",
      },
      fontFamily: {
        body: ['Coiny'],
        indie: ['Indie Flower'],
        inter: ['Inter'],
      },
  
    },
  },
  plugins: [],
};
