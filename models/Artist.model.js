const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const artistSchema = new Schema(
  {
   name: {type: String},
   images: {type: String},
   genres: {type: Array},
   description: {type: String},
   external_urls: {type: String},
   userCreated: {
    type: Boolean,
    default: false
   }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Artist = model("Artist", artistSchema);

module.exports = Artist;
