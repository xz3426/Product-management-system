const db = module.require("../models");

const searchProduct = async (req, res, next) => {
  try {
    console.log(req.params.key);
    let regex = new RegExp(`${req.params.key}`, "i");
    const searchResult = await db.Product.find({ productName: regex });
    return res.status(200).json(searchResult);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { searchProduct };
