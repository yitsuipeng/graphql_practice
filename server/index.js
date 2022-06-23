// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());


// MongoDB connect
const { MongoClient } = require("mongodb");
require('dotenv').config();


app.get('/api/mongo', function (req, res, next) {

  const dbName = 'permission';
  const uri = process.env.mongoURI;
  const client = new MongoClient(uri);

  client.connect()
    .then(() => {
      res.json({
        isConnected: true,
      });
    })
    .catch(error => {
      console.error(error);
      res.json({
        isConnected: false,
      });
    });
});

// Express route handlers
app.get("/", (req, res) => {
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