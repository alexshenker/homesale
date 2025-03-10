import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            xs: "350px",
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        extend: {
            colors: {
                error: "var(--error)",
                text: "var(--text)",
                background: "var(--background)",
                surface: "var(--surface)",
                border: "var(--border)",
                icon: "var(--icon)",
            },
        },
    },
    plugins: [],
} satisfies Config;
