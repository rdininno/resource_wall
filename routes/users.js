// We may need to  change the req.params to req.session in future

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - users
  router.get("/", (req, res) => {
    //send response
    res.send("hello users");
    console.log(`hello from User main`);
    //Get everything from users
    db.query(``)
      .then((data) => {
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get - users with ID
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.send(`hello ${id}`);

    db.query(``)
      .then((data) => {
        // Received Data and pass as object "user"
        console.log(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post -  Edit User with ID
  router.post("/:id", (req, res) => {
    // const something = something

    db.query(``)
      .then((data) => {
        console.log("Update", data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
