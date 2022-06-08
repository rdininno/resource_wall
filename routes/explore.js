require("dotenv").config();

//server requirements
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Direct/render to Explore page
  router.get("/", (req, res) => {
    const id = req.session.user_id;
    let templateVars = {};
    if (id !== undefined) {
      templateVars = { user: id };
    }
    res.render("explore", templateVars);
  });
  return router;
};
