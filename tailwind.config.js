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
        "dark-green": "#355A3F",
        "reg-green": "#57964A",
        "light-green": "#8AC79B",
        cream: "#FEF8EC",
        background: "FCFAFF",
        brown: "#B69E78",
        "dark-cream": "#FBE3B4",
        "dark-blue": "#0F5580",
        "reg-blue": "#7FC5F0",
        "light-blue": "#B6DEF6",
      },
    },
  },
  plugins: [],
};
