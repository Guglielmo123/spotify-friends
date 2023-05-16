const express = require("express");
const router = express.Router();
let Artist = require('../models/Artist.model');
let User = require('../models/User.model')
const { spotifyApi } = require("../config/spotify.config"); // Adjust the path if needed

// searching for artists
router.get("/artist", async (req, res) => {
	try {
		let response = await spotifyApi.searchArtists(req.query.characters);
    const artistData = response.body.artists.items

for (const artistInfo of artistData) {
  const artist = new Artist({
    name: artistInfo.name, images: artistInfo.images, genres: artistInfo.genres, external_urls: artistInfo.external_urls.spotify
  })
  await artist.save()
}


		res.render("artists/artist-search.hbs", {
			result: response.body.artists.items, artistData
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
 
      let filteredAlbums = [];
      for (let i =0; i<sortedAlbums.length - 1; i++){
          if (sortedAlbums[i].name !== sortedAlbums[i+1].name){
              filteredAlbums.push(sortedAlbums[i])
            }
        }
        
        //console.log("F: " + filteredAlbums.length, "A: " + response.body.albums.items.length)

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
      let sortedAlbums = response.body.items
      sortedAlbums.sort((a, b) => a.name.localeCompare(b.name))
 
      let filteredAlbums = [];
      for (let i =0; i<sortedAlbums.length - 1; i++){
          if (sortedAlbums[i].name !== sortedAlbums[i+1].name){
              filteredAlbums.push(sortedAlbums[i])
            }
        }
    
  
      res.render("artists/albums", { result: filteredAlbums });
  
    } catch (error) {
      console.log(error);
    }
  });
  
  // going to tracks of specific album
  router.get("/album-tracks/:albumId", async (req, res) => {
    try {
      let response = await spotifyApi.getAlbumTracks(req.params.albumId);
      //console.log(response.body);

//console.log(response.body.items);
let sortedAlbums = response.body.items
sortedAlbums.sort((a, b) => a.name.localeCompare(b.name))

let filteredAlbums = [];
for (let i =0; i<sortedAlbums.length - 1; i++){
    if (sortedAlbums[i].name !== sortedAlbums[i+1].name){
        filteredAlbums.push(sortedAlbums[i])
      }
  }

     // console.log(response.body.items) // filteredAlbums was here previously 
      res.render("artists/album-tracks", { result: response.body.items });
  
    } catch (err) {
      console.error("The error while searching album tracks occurred: ", err);
    }
  });

router.post('/favourites/:artistId', (req,res)=>{
  const {artistId} = req.params;

  async function createFavArtist(){
    try{
      let foundArtist = await spotifyApi.getArtist(artistId);
      let name = foundArtist.body.name;
      let images = foundArtist.body.images;
      let genres = foundArtist.body.genres;
      let external_urls = foundArtist.body.external_urls.spotify;
      const newArtist = await Artist.create({name, images, genres, external_urls});

      let currentUser = req.session.currentUser;
      await User.findByIdAndUpdate(currentUser._id, {$push: {favourites: newArtist._id}})
    }
    catch(error){
      console.log(error);
    }
  }

  createFavArtist();





})

/*   router.post("/artists/addFavs/:id", async (req, res, next) => {
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    try {
      console.log(id);
      const favouriteArtist = await User.findByIdAndUpdate(currentUser, {
        $push: { favourites: id },
      });
      res.redirect(`/artists/details/${id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  router.post("/artists/removeFavs/:id", async (req, res, next) => {
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    try {
      const favouriteArtist = await User.findByIdAndUpdate(currentUser, {
        $pull: { favourites: id },
      });
      res.redirect(`/artists/details/${id}`);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
  
  router.post("/favorites/:spotId", async (req, res) => {
    try {
      const { spotId } = req.params;
      const favoriteSpot = await Country.findById(spotId);
  
      const userId = req.session.currentUser._id; // Replace with your actual code to retrieve the user ID
  
      await User.findByIdAndUpdate(userId, {
        $push: { favourites: favoriteSpot._id },
      });
  
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      return res.render("error.hbs", { error: "Internal server error" });
    }
  });
  
  router.post("/favorites/:id/delete", async (req, res) => {
    try {
      const favoriteId = req.params.id;
      const userId = req.session.currentUser._id; // Replace with your actual code to retrieve the user ID
  
      await User.findByIdAndUpdate(userId, {
        $pull: { favourites: favoriteId },
      });
  
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      return res.render("error.hbs", { error: "Internal server error" });
    }
  });

 */
module.exports = router;
