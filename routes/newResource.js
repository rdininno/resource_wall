require("dotenv").config();

//server requirements
const express = require("express");
const router = express.Router();

module.exports = (db) => {
//render create new page
  router.get("/", (req, res) => {
    res.render("newResource");
  });
  return router;
};
