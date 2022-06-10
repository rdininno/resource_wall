const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id;
    db.query(`select * from resources where creator_id = $1;`, [id])
      .then((data) => {
        return res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - user Logout
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  // Post - Set users cookie
  router.post("/set/:id", (req, res) => {
    //send response
    const user_id = req.params.id;

    req.session.user_id = user_id;

    res.redirect("/users");
  });

  // Post -  Edit User with ID
  router.post("/:id", (req, res) => {
    db.query(``)
      .then((data) => {
        console.log("Update");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
