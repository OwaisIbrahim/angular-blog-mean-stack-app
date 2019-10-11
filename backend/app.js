const express = require('express');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');

const Post = require('./models/post');

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
})

app.post("/api/posts", (req, res, next) => {
  var post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: result._id
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Post updated successfully"
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  //return all entries
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'posts fetched succussfully',
        posts: documents
      });
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted successfully'
    });
  });
});

module.exports = app;
