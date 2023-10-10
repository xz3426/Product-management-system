const express = require("express");
const { searchProduct } = require("../handlers/search");
const router = express.Router();

router.get("/:key", searchProduct);

module.exports = router;
