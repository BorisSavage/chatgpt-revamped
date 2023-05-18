/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        savage_sig: "cubic-bezier(.2,.8,.2,1)",
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
          950: "#0a0008",
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
          950: "#08141f",
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
          950: "#03120c",
        },
      },
      animation: {
        tilt: "tilt 10s infinite ease-in-out",
        tilty: "tilty 40s infinite linear",
        slight_tilt: "slight_tilt 10s infinite ease-in-out",
        roundhouse: "roundhouse 1s infinite cubic-bezier(.5,.4,.5,.6)",
        roundhouse_slow: "roundhouse 3s infinite cubic-bezier(.5,.4,.5,.6)",
        roundhouse_chill:
          "roundhouse_chill 20s infinite cubic-bezier(.5,.4,.5,.6)",
        rotato: "rotato 1s linear",
      },
      keyframes: {
        rotato: {
          "0%%,": {
            transform: "rotate(0deg)",
            translate: "-50% 0%",
          },
          "50%": {
            transform: "rotate(45deg)",
            translate: "-50% -20.711%",
          },
          "100%": {
            transform: "rotate(90deg)",
            translate: "-50% 0%",
          },
        },
        rotato_reverse: {
          "0%%,": {
            transform: "rotate(0deg)",
            translate: "-50% 0%",
          },
          "50%": {
            transform: "rotate(-45deg)",
            translate: "-50% -20.711%",
          },
          "100%": {
            transform: "rotate(-90deg)",
            translate: "-50% 0%",
          },
        },
        tilt: {
          "0%, 50%, 100%,": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(1deg)",
          },
          "75%": {
            transform: "rotate(-1deg)",
          },
        },
        tilty: {
          "0%, 50%, 100%,": {
            transform: "rotate(0deg) scale(1) skewX(-12deg) skewY(-12deg)",
            opacity: 0.2,
          },
          "25%": {
            transform: "rotate(3deg) scale(1.05) skewX(-10deg) skewY(-14deg)",
            opacity: 0.18,
          },
          "75%": {
            transform: "rotate(-3deg) scale(0.95) skewX(-14deg) skewY(-10deg)",
            opacity: 0.22,
          },
        },
        slight_tilt: {
          "0%, 50%, 100%,": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(0.3deg)",
          },
          "75%": {
            transform: "rotate(-0.3deg)",
          },
        },
        roundhouse: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(90deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "75%": {
            transform: "rotate(270deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        roundhouse_chill: {
          "0%": {
            transform: "rotate(0deg)",
            translate: "-50% -60%",
          },
          "25%": {
            transform: "rotate(90deg)",
            scale: "1 1.5",
          },
          "33.333%": {
            translate: "-40% -40%",
          },
          "50%": {
            transform: "rotate(180deg)",
            scale: "1 1",
          },
          "66.667%": {
            translate: "-60% -40%",
          },
          "75%": {
            transform: "rotate(270deg)",
            scale: "1.5 1",
          },
          "100%": {
            transform: "rotate(360deg)",
            translate: "-50% -60%",
          },
        },
      },
    },
  },
  plugins: [],
};
