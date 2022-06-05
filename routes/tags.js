// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - tag with 'id'
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    // send res for testing
    res.send(`hello: id ${id}`);
    console.log(`hello from Tags: id ${id}`);

    db.query(`SELECT * FROM tags WHERE id = ${id};`)
      .then((data) => {
        const tag = data.rows; // will return array of object
        // res.json({ resources });
        console.log(tag);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD tag
  router.post("/", (req, res) => {
    // need to find out how grab data from req
    const user_id = req.params.id;
    const resource_id = req.params.resource_id;
    const tag = req.params.tag;

    // insert table
    db.query(
      `INSERT INTO tag (user_id, resource_id, tag) 
              VALUES (${user_id}, ${resource_id}, ${tag});`
    )
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Edit tag

  router.post("/:id", (req, res) => {
    // and how to grab all data from req
    const id = req.params.id;
    const user_id = req.params.user_id;
    const tag = req.params.tag;

    // update table
    db.query(
      `UPDATE tags 
      SET user_id = ${user_id}, 
      tag = ${tag}
    WHERE id = ${id};`
    )
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Delete tag
  router.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    //delete query
    db.query(
      `DELETE FROM tags 
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
