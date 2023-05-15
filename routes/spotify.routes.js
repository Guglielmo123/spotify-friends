const express = require("express");
const router = express.Router();
const { spotifyApi } = require("../config/spotify.config"); // Adjust the path if needed

// searching for artists
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
		//console.log(response.body.albums/* .items[0].artists */)

      let sortedAlbums = response.body.albums.items
      sortedAlbums.sort((a, b) => a.name.localeCompare(b.name))
 
      let filteredAlbums = []
      for (let i =0; i<sortedAlbums.length - 1; i++){
          if (sortedAlbums[i].name !== sortedAlbums[i+1].name){
              filteredAlbums.push(sortedAlbums[i])
            }
        }
        
        console.log("F: " + filteredAlbums.length, "A: " + response.body.albums.items.length)

		res.render("artists/album-search.hbs", {
			result: filteredAlbums /* response.body.albums.items */,
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

// going to albums of specific artist
router.get("/albums/:artistId", async (req, res, next) => {
    try {
      let response = await spotifyApi.getArtistAlbums(req.params.artistId);
  
      //console.log(response.body.items);

    
  
      res.render("artists/albums", { result: response.body.items });
  
    } catch (error) {
      console.log(error);
    }
  });
  
  // going to tracks of specific album
  router.get("/album-tracks/:albumId", async (req, res) => {
    try {
      let response = await spotifyApi.getAlbumTracks(req.params.albumId);
      //console.log(response.body);


      res.render("artists/album-tracks", { result: filteredAlbums });
  
    } catch (err) {
      console.error("The error while searching album tracks occurred: ", err);
    }
  });

module.exports = router;
