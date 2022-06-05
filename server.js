// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// const widgetsRoutes = require("./routes/widgets");

//Routes for Favorites, Resources, Reviews and tags

const usersRoutes = require("./routes/users.js");
const resourcesRoutes = require("./routes/resources.js");
const favouritesRoutes = require("./routes/favourites.js");
const reviewsRoutes = require("./routes/reviews.js");
const tagRoutes = require("./routes/tags.js");

// app.use("/api/widgets", widgetsRoutes(db));

app.use("/users", usersRoutes(db));
app.use("/resources", resourcesRoutes(db));

// Need to confirm
app.use("/favouritess", favouritesRoutes(db));

// Home page

// Direct to index page
app.get("/", (req, res) => {
  res.render("index");
});

// Direct to Explore page
app.get("/explore", (req, res) => {
  res.render("explore");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
