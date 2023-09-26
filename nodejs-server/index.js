const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const express = require("express");
const app = express();
const { signup, signin } = require("./src/handlers/auth");

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/api/auth/signup", signup);
app.post("/api/auth/signin", signin);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
