const productModel = require("../models/product.js");

exports.getIndex = (req, res, next) => {
    productModel.find()
    .then(products =>{
        res.render("../views/shop/index", {
            pageTitle: "Shop",
            prods: products,
            path: '/'
        })
    }).catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    productModel.find()
    .then(products =>{
        res.render("../views/shop/product-list", {
            pageTitle: "Shop",
            prods: products,
            path: '/products'
        })
    }).catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const productID = req.params.productID;
    productModel.findById(productID)
    .then(product =>{
        res.render("../views/shop/product-detail.ejs", {
            product: product,
            pageTitle: product.title,
            path: "/products"
        });
    }).catch(err => {
        console.log(err);
    });
};

// exports.getCart = (req, res, next) => {
//     req.user.getCart()
//     .then(products => {
//         res.render("../views/shop/cart.ejs", {
//             pageTitle: "Cart",
//             path: "/cart",
//             products: products,
//         });
//     })
//     .catch(err => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//     const produdctID = req.body.productID;
//     productModel.getProductById(produdctID)
//     .then( product => {
//         return req.user.addToCart(product);
//     })
//     .then( () => {
//         res.redirect('/cart');
//     })
//     .catch( err => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//     const productID = req.body.productID;
//     req.user.deleteCartItem(productID)
//     .then(() => {
//         res.redirect("/cart");
//     })
//     .catch(err => console.log(err));
// };

// exports.postOrder = (req, res, next) => {
//     req.user.addOrder()
//     .then( () => {
//         res.redirect('/orders');
//     })
//     .catch( err => console.log(err));
// };

// exports.getOrder = (req, res, next) => {
//     req.user.getOrders()
//     .then((orders) => {
//         res.render("../views/shop/orders.ejs", {
//             pageTitle: "Ur Order",
//             path: "/orders",
//             orders: orders
//         });
//     })
//     .catch( err => console.log(err));
// };

// exports.getCheckout = (req, res, next) => {
//     res.render("../views/shop/checkout.ejs", {
//         pageTitle: "Checkout",
//         path: "/checkout"
//     });
// };