// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - resources with 'id'
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM resources WHERE id = ${id};`)
      .then((data) => {
        const resources = data.rows; // will return array of object
        res.json({ resources });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD resource
  router.post("/", (req, res) => {
    // need to find out how grab data from req
    const user_id = req.params.id;
    const title = req.params.title;
    const description = req.params.description;
    const url = req.params.url;
    const tag = req.params.tag;

    // insert table
    db.query(
      `INSERT INTO resource (user_id, title, description, url, tag) 
              VALUES (${user_id}, ${title}, ${description}, ${url},${tag});`
    )
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post Edit resource
  router.post("/:id", (req, res) => {
    //Which part of resource need to update
    // and how to grab all data from req
    const id = req.params.id;
    const user_id = req.params.user_id;
    const title = req.params.title;
    const description = req.params.description;
    const url = req.params.url;
    const tag = req.params.tag;

    // update table
    db.query(
      `UPDATE resources 
        SET user_id = ${user_id}, 
        title = ${title}, 
        description = ${description}, 
        url = ${url}, 
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
