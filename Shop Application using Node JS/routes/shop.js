const express = require("express");

const shopController = require("../controllers/shop.js");

const router = express.Router();

const getIndex = shopController.getIndex;
const getProducts = shopController.getProducts;
const getProduct = shopController.getProduct;
const getCart = shopController.getCart;
const postCart = shopController.postCart;
const postCartDeleteProduct = shopController.postCartDeleteProduct;
// const getOrder = shopController.getOrder;
// const getCheckout = shopController.getCheckout;

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productID', getProduct);
router.get('/cart', getCart);
router.post('/cart', postCart);
router.post('/cart-delete-item', postCartDeleteProduct);
// router.get('/orders', getOrder);
// router.get('/checkout', getCheckout);

module.exports = router;