const express = require("express");
const router = express.Router();
const { spotifyApi } = require("../config/spotify.config"); // Adjust the path if needed

router.get("/artist", async (req, res) => {
	try {
		let response = await spotifyApi.searchArtists(req.query.characters);
		res.render("artists/artist-search.hbs", {
			result: response.body.artists.items,
		});
		//console.log(response.body.artists.items)
	} catch (error) {
		console.error(error);
	}
});

router.get("/album", async (req, res) => {
	try {
		let response = await spotifyApi.searchAlbums(req.query.characters);
		//console.log(response.body.albums.items[0].artists)

		res.render("artists/album-search.hbs", {
			result: response.body.albums.items,
		});
	} catch (error) {
		console.error(error);
	}
});

router.get("/song", async (req, res) => {
	try {
		let response = await spotifyApi.searchTracks(req.query.characters);
		//console.log(response.body.tracks.items[0].album.images)

		res.render("artists/song-search.hbs", {
			result: response.body.tracks.items,
		});
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
