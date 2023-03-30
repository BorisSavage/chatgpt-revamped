/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            transitionTimingFunction: {
                "savage-sig": "cubic-bezier(.17,.67,.28,1)",
                "savage-sig-2": "cubic-bezier(.2,.8,.2,1)",
                "mb-phi": "cubic-bezier(.0426,.6146,.5158,1.0298)",
            },
            colors: {
                danviolet: {
                    50: "#f4e9f4",
                    100: "#d6b8d6",
                    200: "#b988b9",
                    300: "#9a599c",
                    400: "#7c297e",
                    500: "#5e005f",
                    600: "#4c004b",
                    700: "#3a0037",
                    800: "#280023",
                    900: "#16000f",
                },
                danblue: {
                    50: "#f5f9fc",
                    100: "#d6e9f9",
                    200: "#aed2f4",
                    300: "#7eb8ef",
                    400: "#4c9de9",
                    500: "#267ae6",
                    600: "#1c5fb4",
                    700: "#194b8c",
                    800: "#143864",
                    900: "#0e2540",
                },
                dangreen: {
                    50: "#f0f9f7",
                    100: "#c2e8d6",
                    200: "#95d7b3",
                    300: "#65c48d",
                    400: "#3fb86f",
                    500: "#1fa15d",
                    600: "#177f4c",
                    700: "#126639",
                    800: "#0c4630",
                    900: "#062b1f",
                },
            },
        },
    },
    plugins: [],
};
