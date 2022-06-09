// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET -  Favourite by user ID(from cookie session)
  router.get("/", (req, res) => {
    const id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("Please log in");
    }
    db.query(
      `SELECT * 
    FROM resources 
    JOIN favourites ON resources.id = resource_id 
    WHERE user_id = ${id};`
    )
      .then((data) => {
        return res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD favourite
  router.post("/", (req, res) => {
    // Check user logged in
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("Please log in");
    }
    const resource_id = req.body.data.resource_id;
    // insert table
    db.query(
      `INSERT INTO favourites (user_id, resource_id)
              VALUES (${user_id}, ${resource_id});`
    )
      .then(() => {
        console.log("Add favourite success");
        res.redirect(`/resources/${resource_id}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Delete favourite
  router.post("/:id/delete", (req, res) => {
    // Check user logged in
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("Please log in");
    }
    const resource_id = req.params.id;
    //delete query
    db.query(
      `DELETE FROM favourites
              WHERE resource_id = ${resource_id}
              AND user_id = ${user_id}`
    )
      .then(() => {
        console.log("Delete favourite success");
        res.redirect(`/resources/${resource_id}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
