//server requirements
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const queries = require("./databaseQueries")(db);

  router.get("/", (req, res) => {
    queries
      .getAllResources()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("error in getAllResources"), res.send(err);
      });
  });

  router.post("/search", (req, res) => {
    if (!req.body.data.searchValue && !req.body.data.tagValue) {
      req.session.searchValue = null;
    }

    if (req.body.data.searchValue) {
      req.session.searchValue = req.body.data.searchValue;
    }

    req.body.data.searchValue = req.session.searchValue;

    queries
      .resourceSearchQuery(req)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("error in searchQuery"), res.send(err);
      });
  });
  return router;
};
