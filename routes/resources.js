// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("newResource");
  });

  // Post - ADD resource
  router.post("/", (req, res) => {
    const url = req.body.url;
    const title = req.body.title;
    const description = req.body.description;

    // insert table
    return db
      .query(
        `INSERT INTO resources (creator_id, title, description, url) VALUES ('1', $1, $2, $3)`,
        [title, description, url]
      )
      .then((res) => {
        return res.rows[0];
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  // Post Edit resource
  router.post("/:id", (req, res) => {
    //Which part of resource need to update
    // and how to grab all data from req

    // update table
    db.query(``)
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Delete resource
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    //delete query
    db.query(
      `DELETE FROM resources
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
