const express = require("express");
const router = express.Router();
const { creatProduct } = require("../handlers/product");

router.post("/product", creatProduct);
// router.get("/products", getProducts);
// router.get("/product/:id", getProductById);
// router.put("/product/:id", editProduct);

module.exports = router;
