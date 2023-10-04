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

module.exports = { creatProduct };
