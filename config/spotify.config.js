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

module.exports.spotifyApi = spotifyApi;