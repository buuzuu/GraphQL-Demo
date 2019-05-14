const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLSchema

} = graphql

//Scalar  Type
/*
String
int
FLoat
Boolean
ID
*/

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'Represents a Person Type',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        isMarried: { type: GraphQLBoolean },
        gpa: { type: GraphQLFloat },
        justAType: {
            type: Person,
            resolve(parent, args) {
                return parent;
            }
        }
    })
});
//Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person:{
            type:Person,
            resolve(parent,args){
                let personObj = {
                    name: 'Gupta',
                    age:34,
                    isMarried:true,
                    gpa:4.0,
                };

                return personObj;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})


