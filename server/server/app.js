const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../shema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;


mongoose.connect('mongodb+srv://Kirill:nF3bennd@cluster0.ncijq.mongodb.net/graphql-project?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	});



app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));


app.listen(PORT, err => {
	err ? console.log(err) : console.log('Server started!');
});