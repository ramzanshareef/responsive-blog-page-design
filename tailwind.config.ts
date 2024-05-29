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
                "primary": "#FF6464",
                "secondary": "#00A8CC",
                "dark": "#21243D",
                "light": "#8695A4",
            }
        }
    },
    plugins: [],
};
export default config;