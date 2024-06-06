const express = require("express");
const bodyParser = require("body-parser");

const adminController = require("../controllers/admin");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));

const getAddProduct = adminController.getAddProduct;
const postAddProduct = adminController.postAddProduct;
const getEditProduct = adminController.getEditProduct;
const postEditProduct = adminController.postEditProduct;
const postDeleteProduct = adminController.postDeleteProduct;
const getProducts = adminController.getProducts;

router.get('/add-product', isAuthenticated, getAddProduct);
router.post('/add-product', isAuthenticated, postAddProduct);
router.get('/edit-product/:productID', isAuthenticated, getEditProduct);
router.post('/edit-product', isAuthenticated, postEditProduct);
router.post('/delete-product', isAuthenticated, postDeleteProduct);
router.get('/products', isAuthenticated, getProducts);

exports.Router = router;