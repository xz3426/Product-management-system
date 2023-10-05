const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");
mongoose.connect(process.env.MONGODB_URI);

// module.exports.User = User;
// module.exports.Product = Product;
module.exports = { User, Product };
