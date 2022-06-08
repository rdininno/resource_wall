// We may need change the req.params to req.session in future
// Need to connect to tag table

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const id = req.session.user_id;
    let templateVars = {};
    if (id !== undefined) {
      templateVars = { user: id };
    }
    res.render("newResource", templateVars);
  });

  // Get - resources with 'id'
  router.get("/:id", (req, res) => {
    const user_id = req.session.user_id;
    const id = req.params.id;

    db.query(`select * from resources where id = ${id};`)
      .then((data) => {
        const resource = data.rows[0];
        res.render("resourcePage", { data: resource, user: user_id });
        // return resource;
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD resource
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("User not log in");
    }
    const url = req.body.url;
    const title = req.body.title;
    const description = req.body.description;
    const tags = req.body.tags;

    // insert table
    return db
      .query(
        `INSERT INTO resources (creator_id, title, description, url) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [user_id, title, description, url]
      )
      .then((res) => {
        const newResource = res.rows[0];
        return db.query(
          `INSERT INTO tags (user_id, resource_id, tag) VALUES ($1, $2, $3)`,
          [user_id, newResource.id, tags]
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  // Post - Delete resource
  router.post("/:id/delete", (req, res) => {
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      res.redirect("/");
    }
    const resource_id = req.params.id;
    //delete query
    console.log("delete listen");
    db.query(
      `DELETE FROM resources
          WHERE id = ${resource_id}
          And creator_id = ${user_id}`
    )
      .then((data) => {
        console.log("delete success");
        res.redirect("/users");
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

  return router;
};
