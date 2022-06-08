const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/posts", (req, res) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "SUCCESS",
  });
});

app.get("/api/posts", (req, res) => {
  const posts = [
    { id: "32132131dsa1", title: "One Title", content: "Hello !!!!!!" },
    { id: "asdsasdad123", title: "Two Title", content: "Hello  e12e" },
    { id: "12312dsaddsa", title: "Three Title", content: "Hello 12321" },
  ];
  res.status(200).json({
    message: "SUCCESS",
    posts,
  });
});

module.exports = app;
