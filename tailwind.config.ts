// tailwind.config.ts 예시
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg0: "#f7f6f2",
                bg1: "#ffffff",
                bg2: "#f0ede7",
                bg3: "#e8e4dc",
                text1: "#1c1b18",
                text2: "#5a5955",
                text3: "#908e89",
                border: "rgba(0,0,0,0.10)",
                "border-md": "rgba(0,0,0,0.16)",
                success: { bg: "#eaf3de", text: "#2e5a0a", border: "#7ab842" },
                warning: { bg: "#fef3da", text: "#7a4500", border: "#e8960a" },
                danger: { bg: "#fceaea", text: "#941f1f", border: "#d94040" },
                info: { bg: "#e5f0fb", text: "#124e96", border: "#3282d4" },
                accent: { DEFAULT: "#1d5fa8", light: "#e5f0fb" },
            },
            fontSize: {
                xxs: "10px", // 10px 사이즈가 많이 쓰이므로 추가
            },
            gridTemplateColumns: {
                '15': 'repeat(15, minmax(0, 1fr))',
            },
        },
    },
    plugins: [],
};
export default config;