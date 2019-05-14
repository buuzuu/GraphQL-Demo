const graphql = require('graphql');
var _ = require('lodash');
const mongoose = require('mongoose');


const User = require('../model/user');
const Hobby = require('../model/hobby');
const Post = require('../model/post');

// dummy data
var usersData = [
    { id: '1', name: 'Hritik', age: 22, profession: 'Coder' },
    { id: '2', name: 'Parul', age: 20, profession: 'Baker' },
    { id: '3', name: 'Vaiid', age: 21, profession: 'Painter' },
    { id: '4', name: 'Suhani', age: 14, profession: 'Driver' },
    { id: '5', name: 'Paulo', age: 33, profession: 'Teacher' }
];
var hobbiesData = [
    { id: '1', title: 'Programming', description: 'Using computer to make the world a better place', userId: '1' },
    { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donots', userId: '1' },
    { id: '3', title: 'Swimming', description: 'Get in the water and learn to become water', userId: '2' },
    { id: '4', title: 'Fencing', description: 'A stupid hobby.', userId: '1' },
    { id: '5', title: 'Hiking', description: 'Again stupid hobby to have.', userId: '3' }

];

var postData = [

    { id: '1', comment: 'Weather was warm today.', userId: '1' },
    { id: '2', comment: 'Parul proposed me on 16th september', userId: '1' },
    { id: '3', comment: 'I am an Android Developer.', userId: '2' },
    { id: '4', comment: 'Inderneel chutiya hai.', userId: '1' },
    { id: '5', comment: 'I might be going to Belgium this August.', userId: '3' }
];



const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql


//create types
const UserType = new GraphQLObjectType({

    name: "User",
    description: 'Documentation for user...',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find({ userId: parent.id })
            }


        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                // return _.filter(hobbiesData, { userId: parent.id })
                return Hobby.find({ userId: parent.id })
            }
        }
    })

});

const HobbyType = new GraphQLObjectType({

    name: "Hobby",
    description: 'Hobby Description',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: {type:GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        }
    })

});



const PostType = new GraphQLObjectType({

    name: "Post",
    description: 'Post Description',
    fields: () => ({
        id: { type: GraphQLID },
        comment: { type: GraphQLString },
     //   rate:{type:GraphQLInt},
        userId: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        }
    })

});

//RootQuery

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },

            resolve(parent, args) {
                // we resolve with data
                //get and return data from a datasource
                const data = User.findById(args.id);

                //return _.find(usersData, { id: args.id })
                return data
            }
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(hobbiesData, { id: args.id })
                const data = Hobby.findById(args.id);

                return data
            }

        },
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                const data = Post.findById(args.id);

                return data
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return Hobby.find();
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find();
            }
        }
    }
});

//Mutations
const Mutations = new GraphQLObjectType({

    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                //id:{type:GraphQLID}
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLString) },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {

                const user = new User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                })
                //SAVE TO DB
                return user.save();
            }
        },
        updateUser: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
                profession: { type: GraphQLString }
            },
            resolve(parent, args) {

                return updateUser = User.findByIdAndUpdate(
                    args.id, {
                        $set: {
                            name: args.name,
                            age: args.age,
                            profession: args.profession
                        }
                    }, { new: true }
                )
            }
        },


        createPost: {
            type: PostType,
            args: {
                //id:{type:GraphQLID}
                comment: { type: GraphQLString },
             //   rate: {type:GraphQLInt},
                userId: { type: GraphQLID }
            },
            resolve(parent, args) {
                let post = new Post({
                    comment: args.comment,
                //    rate:args.rate,
                    userId: args.userId
                })
                return post.save();
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                comment: { type: GraphQLString },
                //  userId: { type: GraphQLString }
            },
            resolve(parent, args) {
                return updatedPost = Post.findByIdAndUpdate(
                    args.id, {
                        $set: {
                            comment: args.comment,

                        }
                    },
                    { new: true }
                )
            }
        },

        createHobby: {
            type: HobbyType,
            args: {
                //id:{type:GraphQLID}
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                userId: { type: GraphQLID }

            },
            resolve(parent, args) {
                let hobby = new Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                })
                return hobby.save();
            }
        },
        updateHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                // userId: { type: GraphQLString }
            },
            resolve(parent, args) {
                return updatedHobby = Hobby.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            title: args.title,
                            description: args.description
                        }
                    },
                    { new: true }
                )
            }
        },
        removeUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let removeUser = User.findByIdAndRemove(
                    args.id).exec();

                if (!removeUser) {
                    throw new ("Error");
                }
                return removeUser;

            }
        },
        removePost: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let removePost = Post.findByIdAndRemove(
                    args.id).exec();

                if (!removePost) {
                    throw new ("Error");
                }
                return removePost;

            }
        },
        removeHobby: {
            type: HobbyType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let removeHobby = Hobby.findByIdAndRemove(
                    args.id).exec();

                if (!removeHobby) {
                    throw new ("Error");
                }
                return removeHobby;

            }
        }



    }

});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})
