require("dotenv").config();

//server requirements
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Direct/render to Explore page
  router.get("/", (req, res) => {
    res.render("explore");
  });
  return router;
};
