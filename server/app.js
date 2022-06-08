const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("HELLO FROM MW");
  next();
});

app.use((req, res, next) => {
  res.json("hello from response");
});

module.exports = app;
