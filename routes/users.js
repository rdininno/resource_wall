// We may need to  change the req.params to req.session in future

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - resources with ID(from cookie session)
  router.get("/", (req, res) => {
    // const id = req.params.id;
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
    console.log("logout listen");
    req.session = null;
    res.redirect("/");
  });

  // Post - Set users cookie
  router.post("/set/:id", (req, res) => {
    //send response
    const user_id = req.params.id;
    // console.log(`id`, user_id);
    req.session.user_id = user_id;
    console.log(`id`, req.session.user_id);
    res.redirect("/users");
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
