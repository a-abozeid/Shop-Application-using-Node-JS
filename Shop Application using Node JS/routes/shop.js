const express = require("express");

const shopController = require("../controllers/shop.js");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

const getIndex = shopController.getIndex;
const getProducts = shopController.getProducts;
const getProduct = shopController.getProduct;
const getCart = shopController.getCart;
const postCart = shopController.postCart;
const postCartDeleteProduct = shopController.postCartDeleteProduct;
const postOrder = shopController.postOrder;
const getOrder = shopController.getOrder;

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:productID', getProduct);
router.get('/cart', isAuthenticated, getCart);
router.post('/cart', isAuthenticated, postCart);
router.post('/cart-delete-item', isAuthenticated, postCartDeleteProduct);
router.post('/create-order', isAuthenticated, postOrder);
router.get('/orders', isAuthenticated, getOrder);

module.exports = router;