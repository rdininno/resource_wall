//server requirements
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const queries = require("./databaseQueries")(db);

  router.get("/", (req, res) => {
    // res.json({ test: 123 });
    queries.getAllResources()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("error in getAllResources"), res.send(err);
      });
  });

  router.post("/search", (req, res) => {

    queries.resourceSearchQuery(req)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("error in searchQuery"), res.send(err);
      });
  })
  return router;
};
