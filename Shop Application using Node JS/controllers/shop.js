const productModel = require("../models/product.js");
// const cartModel = require("../models/cart.js");

exports.getIndex = (req, res, next) => {
    productModel.getAllProducts()
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
    productModel.getAllProducts()
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
    productModel.getProductById(productID)
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
    req.user.getCart()
    .then(products => {
        console.log(products);
        res.render("../views/shop/cart.ejs", {
            pageTitle: "Cart",
            path: "/cart",
            products: products,
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const produdctID = req.body.productID;
    productModel.getProductById(produdctID)
    .then( product => {
        return req.user.addToCart(product);
    })
    .then( () => res.redirect('/cart'))
    .catch( err => console.log(err));

    // let newCart;
    // let quantity = 1;
    // req.user.getCart()
    // .then(cart => {
    //     newCart = cart;
    //     return cart.getProducts({where: {id: produdctID}});
    // })
    // .then(products => {
    //     let product = products[0];
    //     if(product){
    //         const oldQuantity = product.cartItem.quantity;
    //         quantity = oldQuantity + 1;
    //         return product;
    //     }
    //     return productModel.findByPk(produdctID);
    // })
    // .then(product => {
    //     return newCart.addProduct(product, {through: {quantity: quantity}});
    // })
    // .then(() => {
    //     res.redirect("/cart");
    // })
    // .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productID = req.body.productID;
    req.user.deleteCartItem(productID)
    .then(() => {
        res.redirect("/cart");
    })
    .catch(err => console.log(err));
};

// exports.getOrder = (req, res, next) => {
//     res.render("../views/shop/orders.ejs", {
//         pageTitle: "Ur Order",
//         path: "/orders"
//     });
// };

// exports.getCheckout = (req, res, next) => {
//     res.render("../views/shop/checkout.ejs", {
//         pageTitle: "Checkout",
//         path: "/checkout"
//     });
// };