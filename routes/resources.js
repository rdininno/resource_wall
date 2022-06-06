// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - resources with 'id'
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    //send res for testing

    console.log(`hello from resources: id ${id}`);
    db.query(`select * from resources where id = ${id};`)
      .then((data) => {
        console.log(data.rows);
        // res.send(`hello: id ${id}`);
        return res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD resource
  router.post("/", (req, res) => {
    // need to find out how grab data from req

    // const something = something

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
