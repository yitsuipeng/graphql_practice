// Express App Setup
const express = require("express");
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const result = require('dotenv').config();

const app = express();

// MongoDB connect
mongoose.Promise = global.Promise;
mongoose.connect(result.parsed.MONGO_URI)
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Express route handlers
app.get("/", (req, res, next) => {
  res.send("Hi");
});

// Page not found
app.use(function(req, res, next) {
  res.status(404).send('Not found');
});

// Error handling
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(5000, (err) => {
  console.log("Listening");
});

module.exports = app;