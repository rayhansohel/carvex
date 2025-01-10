/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        antonio: ["Antonio", "serif"],
        poppins: ["Poppins", "serif"],
      },
      backgroundImage: {
        addcar: "url('https://i.ibb.co.com/q5ztbCd/4.png')",
        availablecar: "url('https://i.ibb.co.com/0hdZn3C/19.jpg')",
        cardetails: "url('https://i.ibb.co.com/NKVm7yn/1.png')",
        hero: "url('https://i.ibb.co.com/dKQGk3K/3.png')",
        login: "url('https://i.ibb.co.com/pLPTRDX/8960.jpg')",
        mybookings: "url('https://i.ibb.co.com/n6XK42N/2.png')",
        mycars: "url('https://i.ibb.co.com/yBBnPSk/3.png')",
        register: "url('https://i.ibb.co.com/Wcht9XT/2177.jpg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#3f3f46",
          secondary: "#ffffff",
          accent: "#ff0055",
          neutral: "#52525b",
          "base-100": "#e5e7eb",
          "base-200": "#f3f4f6",
          "base-300": "#f8fafc",
          info: "#4f46e5",
          success: "#059669",
          warning: "#ea580c",
          error: "#e11d48",
        },
        dark: {
          primary: "#d4d4d8",
          secondary: "#000000",
          accent: "#ff0055",
          neutral: "#52525b",
          "base-100": "#0D1117",
          "base-200": "#151B23",
          "base-300": "#010409",
          info: "#4f46e5",
          success: "#059669",
          warning: "#ea580c",
          error: "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
