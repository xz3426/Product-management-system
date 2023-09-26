const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());

// Api-endpints

// Authentication module url
app.use("/api/auth", require("./src/routes/auth"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
