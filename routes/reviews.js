// We may not need this route

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - reviews with 'id'
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    // send res for testing
    res.send(`hello: id ${id}`);
    console.log(`hello from Reviews: id ${id}`);

    db.query(`SELECT * FROM reviews WHERE id = ${id};`)
      .then((data) => {
        const tag = data.rows; // will return array of object

        console.log(tag);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD reviews
  router.post("/", (req, res) => {
    console.log("whats happening in reviews.js");
    // need to find out how grab data from req
    const user_id = req.params.id;
    const resource_id = req.params.resource_id;
    const comment = req.params.comment;
    const rating = req.params.rating;

    // insert table
    return db
      .query(
        `INSERT INTO reviews (user_id, resource_id, comment, rating)
              VALUES (${user_id}, ${resource_id}, ${comment}, ${rating});`
      )
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - review and comment
  router.post("/:id", (req, res) => {
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("Please log in");
    }
    const resourceId = req.params.id;
    const rating = req.body.rating;
    const comment = req.body.comment;

    // update table
    db.query(
      `INSERT INTO reviews (resource_id, reviewer_id, rating, comment) VALUES ($1, $2, $3, $4)`,
      [resourceId, user_id, rating, comment]
    )
      .then((data) => {
        console.log("successful insert");
        res.redirect(`/resources/${resourceId}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Delete reviews
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    //delete query
    db.query(
      `DELETE FROM reviews
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
