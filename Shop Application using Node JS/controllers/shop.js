const productModel = require("../models/product.js");
const orderModel = require("../models/order.js");

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

exports.getCart = (req, res, next) => {
    req.user.populate("cart.items.productID")
    .then(user => {
        products = user.cart.items;
        totalPrice = user.cart.totalPrice;
        res.render("../views/shop/cart.ejs", {
            pageTitle: "Cart",
            path: "/cart",
            products: products,
            total: totalPrice
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const produdctID = req.body.productID;
    productModel.findById(produdctID)
    .then( product => {
        return req.user.addToCart(product);
    })
    .then( () => {
        res.redirect('/cart');
    })
    .catch( err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productID = req.body.productID;
    req.user.deleteCartItem(productID)
    .then(() => {
        res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.user.populate("cart.items.productID")
    .then(user => {
        const products = user.cart.items.map(item => {
            return {
                product: {...item.productID._doc},
                quantity: item.quantity
             };
        });

        const order = new orderModel({
            products: products,
            user: {
                userName: req.user.name,
                userID: req.user._id
            },
            totalPrice: req.user.cart.totalPrice
        });

        return order.save();
    })
    .then(() => {
        return req.user.clearCart();
    })
    .then( () => {
        res.redirect('/orders');
    })
    .catch( err => console.log(err));
};

exports.getOrder = (req, res, next) => {
    orderModel.find({"user.userID": req.user._id})
    .then((orders) => {
        res.render("../views/shop/orders.ejs", {
            pageTitle: "Ur Order",
            path: "/orders",
            orders: orders
        });
    })
    .catch( err => console.log(err));
};
