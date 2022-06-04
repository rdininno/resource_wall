// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - reviews with 'id'
  router.get("/:id", (req, res) => {
    const id = req.params.id;
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
    // need to find out how grab data from req
    const user_id = req.params.id;
    const resource_id = req.params.resource_id;
    const comment = req.params.comment;
    const rating = req.params.rating;

    // insert table
    db.query(
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

  // Post - Edit reviews

  router.post("/:id", (req, res) => {
    // and how to grab all data from req
    const id = req.params.id;
    const user_id = req.params.id;
    const resource_id = req.params.resource_id;
    const comment = req.params.comment;
    const rating = req.params.rating;

    // update table
    db.query(
      `UPDATE rating 
        SET user_id = ${user_id}, 
        resource_id = ${resource_id},
        comment = ${comment},
        rating = ${rating}
    WHERE id = ${id};`
    )
      .then((data) => {
        console.log(data.rows);
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
