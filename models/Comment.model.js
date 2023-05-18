const {Schema, model} = require('mongoose');

const commentSchema  = new Schema({
    spotifyArtist: String,
    content: String, 
    rating: Number,
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});


module.exports = model('Comment', commentSchema);