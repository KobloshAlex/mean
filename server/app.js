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

module.exports = app;
