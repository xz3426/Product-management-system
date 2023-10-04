const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    min: 0,
    require: true,
  },
  imgLink: {
    type: String,
    default: null,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;