// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");


// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "Spotify friends";

app.locals.appTitle = `${capitalize(projectName)} - search for your favourite Artists, Albums or Songs 👩‍🎨🔍`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const spotifyRoutes = require("./routes/spotify.routes");
app.use("/", spotifyRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


/* 
app.get('/artist', (req, res) => {
  // Handle the request logic for /artist route here
  // This could include retrieving data from the Spotify API, rendering a template, etc.
  // For testing purposes, you can simply send a response back
  res.send('This is the artist route');
});
 */

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
