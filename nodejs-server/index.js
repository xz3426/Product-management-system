const express = require("express");
const app = express();
// const UserSchema = require('./models').User;

const PORT = process.env.PORT || 3000;

app.get("/api/users", (req, res) => {});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
