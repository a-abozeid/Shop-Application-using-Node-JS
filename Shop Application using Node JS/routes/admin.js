const express = require("express");
const bodyParser = require("body-parser");

const adminController = require("../controllers/admin");

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));

const getAddProduct = adminController.getAddProduct;
const postAddProduct = adminController.postAddProduct;
const getEditProduct = adminController.getEditProduct;
const postEditProduct = adminController.postEditProduct;
const postDeleteProduct = adminController.postDeleteProduct;
const getProducts = adminController.getProducts;

router.get('/add-product', getAddProduct);
router.post('/add-product', postAddProduct);
router.get('/edit-product/:productID', getEditProduct);
router.post('/edit-product', postEditProduct);
router.post('/delete-product', postDeleteProduct);
router.get('/products', getProducts);

exports.Router = router;