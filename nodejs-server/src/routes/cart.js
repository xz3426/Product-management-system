const express = require('express');
const router = express.Router();
const {
  addProduct,
  removeProduct,
  removeAllProducts,
  updateQuantity,
  checkout,
  fetchCart
} = require('../handlers/cart');

// POST - add a product to a user's cart
router.route('/addProduct').post(addProduct);

// DELETE - remove a product from a user's cart
router.route('/removeProduct').delete(removeProduct);
router.route('/removeAllProducts').delete(removeAllProducts);

// PUT - update quantity of a product in a user's cart
router.route('/updateQuantity').put(updateQuantity);

// GET - get all products in a user's cart
router.route('/fetchCart').post(fetchCart);

// POST - Checkout a user's cart
router.route('/checkout').post(checkout);

module.exports = router;
