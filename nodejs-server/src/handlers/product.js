const db = module.require("../models");
const jwt = module.require("jsonwebtoken");

const creatProduct = async (req, res, next) => {
  try {
    await db.Product.create(req.body);
    return res.status(200).json({
      message: "Product created successfully",
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await db.Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = req.id;
    const product = await db.Product.findById(productId);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const productId = req.id;
    const product = await db.Product.findByIdAndUpdate(productId, req.body);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

module.exports = {
  creatProduct,
  getAllProducts,
  getProductById,
  updateProductById,
};
