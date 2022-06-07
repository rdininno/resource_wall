// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET -  Favourite by ID(from cookie session)
  router.get("/", (req, res) => {
    const id = req.session.user_id;
    db.query(
      `SELECT * 
    FROM resources 
    JOIN favourites ON resources.id = resource_id 
    WHERE user_id = ${id};`
    )
      .then((data) => {
        console.log(data.rows);
        return res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD favourite
  router.post("/", (req, res) => {
    // need to find out how grab data from req
    const user_id = req.params.id;
    const resource_id = req.params.resource_id;

    // insert table
    db.query(
      `INSERT INTO favourites (user_id, resource_id) 
              VALUES (${user_id}, ${resource_id});`
    )
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Delete favourite
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    //delete query
    db.query(
      `DELETE FROM favourite 
              WHERE id = ${id}`
    )
      .then((data) => {
        console.log("delete success");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
