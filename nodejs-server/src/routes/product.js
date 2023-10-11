const express = require("express");
const router = express.Router();
const {
  creatProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../handlers/product");

router.post("/product", creatProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProductById);
router.delete("/product/:id", deleteProductById);

module.exports = router;
