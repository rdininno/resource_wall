/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Get - users
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Get - users with ID
  router.get("/:id", (req, res) => {
    //Need to find a way to get id from url or req
    db.query(`SELECT * FROM users where id = ${id}`)
      .then((data) => {
        const user = data.rows;
        // Received Data and pass as object "user"
        res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Post - User with ID
  router.post("/:id", (req, res) => {
    // Need to identify which column need to update
    // and grab info from url or req
    db.query(
      `UPDATE users 
      SET username = ${username}, 
      email = ${email}, 
      password=${password}
      WHERE id = ${id};`
    )
      .then((data) => {
        console.log("Update", data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
