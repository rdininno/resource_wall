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
    return db
      .query(
        `select user_id as user_like from favourites where resource_id = ${id};`
      )
      .then((data) => {
        let user_like = data.rows;
        return db
          .query(`SELECT * FROM resources
          LEFT JOIN reviews ON resource_id = resources.id
          JOIN users ON creator_id = users.id
          WHERE resources.id = ${id}
          OR resources.id IN (
            SELECT resource_id
            FROM reviews
            WHERE resource_id = ${id}
            );
          `)
          .then((data) => {
            const resource = data.rows;

            let sum = 0;
            for (const i in resource){
               sum += resource[i].rating
            }
            let average = (sum/resource.length).toFixed(1);

            templateVars = { average, data: resource, user: user_id };
            for (const ii of user_like) {
              if (ii.user_like == user_id) {
                templateVars["like"] = ii.user_like;
              }
            }
            res.render("resourcePage", templateVars);
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - ADD resource
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      return res.send("ERROR User not log in");
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
      res.send("ERROR User not log in");
    }
    const resource_id = req.params.id;
    //delete query
    console.log("delete listen");
    db.query(
      `DELETE FROM resources
          WHERE id = ${resource_id}
          AND creator_id = ${user_id}`
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
    const user_id = req.session.user_id;
    if (typeof user_id === "undefined") {
      res.send("ERROR User not log in");
    }
    const editQuery = `UPDATE resources SET title = $1, description = $2, url = $3 WHERE id = $4 RETURNING *`;
    const editQueryParams = [
      req.body.title,
      req.body.description,
      req.body.url,
      req.params.id,
    ];
    // update table
    return db
      .query(editQuery, editQueryParams)
      .then((data) => {
        const resourceId = data.rows[0];
        db.query("UPDATE tags SET tag = $1 WHERE resource_id = $2", [
          req.body.tags,
          resourceId.id,
        ]);
        res.redirect(`/resources/${resourceId.id}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
