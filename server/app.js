const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./models/post");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/mean")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(express.json());
app.use(cors());

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post
    .save()
    .then((result) => {
      res.status(201).json({
        message: "SUCCESS",
        postId: result._id,
      });
    })
    .catch(console.error);
});

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();

  console.log(`${posts.length} where found`);

  res.status(200).json({
    message: "SUCCESS",
    posts,
  });
});

app.delete("/api/posts/:id", async (req, res) => {
  console.log(req.params.id);

  await Post.deleteOne({ _id: req.params.id });

  res.status(200).json({
    status: "SUCCESS",
  });
});

app.put("/api/posts/:id", (req, res) => {
  console.log(req.body);

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "SUCCESS",
    });
  });
});

app.get("/api/posts/:id", (req, res) => {
  console.log(req.params.id)
  Post.findById(req.params.id).then((post) => {
    if (!post) {
      res.status(404).json({
        message: "post not exist",
      });
    }

    console.log(post)
    res.status(200).json({
      post,
    });
  });
});

module.exports = app;
