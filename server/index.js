const app = require("./app");
const http = require("http");

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
