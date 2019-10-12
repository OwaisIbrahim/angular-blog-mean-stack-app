const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const PostComponent = require('./routes/post');

const app = express();

mongoose.connect(
  'mongodb+srv://owais:iH1GTExI0Fwh6Nbj@cluster0-wiet6.mongodb.net/node-angular?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
  console.log('Connected to database');
})
.catch((err) => {
  console.log('Connection failed! ERROR: ' + err)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use('/api/posts', PostComponent)

module.exports = app;
