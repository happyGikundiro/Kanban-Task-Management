/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: "#635FC7",
        purplehover: "#A8A4FF",
        black: "#000112",
        verydarkgrey: "#20212C",
        darkgrey: "#2B2C37",
        dark: "#3E3F4E",
        mediumgrey: "#828FA3",
        light: "#E4EBFA",
        lightgrey: "#F4F7FD",
        white: "#FFFFFF",
        red: "#EA5555",
        redhover: "#FF9898",
        grey: "#E0E3E8",
      },
    },
  },
  plugins: [],
};
