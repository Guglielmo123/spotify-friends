const express = require('express');
const router = express.Router();
const { spotifyApi } = require('../app'); // Adjust the path if needed

router.get('/artist', async (req, res) => {
  try {
    let response = await spotifyApi.searchArtists(req.query.characters);
    res.render('artists/artist-search.hbs', { result: response.body.artists.items });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

