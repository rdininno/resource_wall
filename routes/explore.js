require("dotenv").config();

//server requirements
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Direct/render to Explore page
  app.get("/explore", (req, res) => {
    res.render("explore");
  });
};
