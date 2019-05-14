const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const typeSchema = require('./schema/typeSchema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

const port = process.env.PORT || 4000;

/*
mongodb+srv://buuzuu:goforgold@graphqldemo-dhk4y.mongodb.net/test?retryWrites=true
*/

mongoose.connect('mongodb+srv://buuzuu:goforgold@graphqldemo-dhk4y.mongodb.net/test?retryWrites=true'
    , { useNewUrlParser: true }).then(res => console.log("Yo!! Connected to MongoDB.")).catch(err => console.log(err));
mongoose.set('useFindAndModify', false);
mongoose.connection.once('open', () => {

    console.log('Connecting...');
}
);

app.use(cors());


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))
app.listen(port, () => {
    console.log('Listening to 4000 port');
})


