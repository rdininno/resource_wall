module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        "dark-red": "#780000",
        "reg-red": "#C1121F",
        cream: "#FDF0D5",
        background: "FCFAFF",
        "dark-cream": "#FBE3B4",
        "dark-blue": "#003049",
        "reg-blue": "#669BBC",
      },
    },
  },
  plugins: [],
};
