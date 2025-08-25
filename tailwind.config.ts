/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // 4. Tambahkan fontFamily
            fontFamily: {
                sans: ['var(--font-inter)'],
                mono: ['var(--font-poppins)'],
            },
        },
    },
    plugins: [],
};