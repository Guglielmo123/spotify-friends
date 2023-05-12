// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// Require SpotifyAPI
const SpotifyWebApi = require('spotify-web-api-node');


// get your credentials from .env file using process.env
// CLIENT_ID and CLIENT_SECRET are the variable names we gave in .env file (don't forget to create .env file!!!)
//      |           |
//      --------------------------------------------|
//                                                  |
const spotifyApi = new SpotifyWebApi({
    //           |
    clientId: process.env.CLIENT_ID, // <-------------|
    clientSecret: process.env.CLIENT_SECRET // <------|
  });
  
  // ******************** Retrieve an access token: **********************
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));



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

app.locals.appTitle = `${capitalize(projectName)} - search for your favourite Artists 👩‍🎨🔍`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
