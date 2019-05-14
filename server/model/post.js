const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

const postSchema = new MSchema({
    comment: String,
   // rate: Number,
    userId: String,
    

})


module.exports = mongoose.model('Post', postSchema);