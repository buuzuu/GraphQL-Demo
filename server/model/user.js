const mongoose = require('mongoose');


const MSchema = mongoose.Schema;
// id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         profession: { type: GraphQLString },

const userSchema = new MSchema({
    name: String,
    age: Number,
    profession: String
})

module.exports = mongoose.model('User', userSchema);

// const userSchema = mongoose.model('User',new mongoose.Schema({

//     name:  String,
//     age: Number,
//     profession: String
// }));

// exports.Schema = userSchema;
