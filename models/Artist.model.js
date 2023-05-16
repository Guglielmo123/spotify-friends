const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const artistSchema = new Schema(
  {
   name: String,
   images: Array, 
   genres: Array, 
   external_urls: String,
   

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;
