const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - reviews with 'id'
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    // send res for testing

    db.query(`SELECT * FROM reviews WHERE id = ${id};`)
      .then((data) => {
        const tag = data.rows; // will return array of object

        return;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD reviews
  router.post("/", (req, res) => {
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
        return;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - review and comment
  router.post("/:id", async (req, res) => {
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("Please log in");
    }
    const resourceId = req.params.id;
    const rating = req.body.rating;
    const comment = req.body.comment;

    const insertQuery = await db.query(
      `INSERT INTO reviews (resource_id, reviewer_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`,
      [resourceId, user_id, rating, comment]
    );

    return db
      .query(
        `SELECT * FROM reviews JOIN users ON reviews.reviewer_id = users.id WHERE reviews.id = ${insertQuery.rows[0].id}`
      )
      .then((data) => {
        const value = data.rows[0];

        res.json({ value });
      })
      .catch((err) => {
        "error", err.message;
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
