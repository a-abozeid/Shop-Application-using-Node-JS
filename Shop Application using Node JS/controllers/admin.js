const productModel = require("../models/product.js");

exports.getAddProduct = (req, res, next) => {
    res.render("../views/admin/add-product.ejs", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        edit: false
    });
};

exports.postAddProduct =  (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new productModel({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description:description
    });
    product.save()
    .then(() => {
        res.redirect("/admin/products");
    })
    .catch(err => {
        console.log(err)
    });
};

exports.getEditProduct = (req, res, next) => {
    const productID = req.params.productID;
    productModel.findById(productID)
    .then(product => {
        res.render("../views/admin/add-product.ejs", {
            pageTitle: "Edit Product",
            path: "/admin/products",
            product: product,
            edit: true
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
    const productID = req.body.productID;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    productModel.findById(productID)
    .then(product => {
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        return product.save();
    })
    .then(() => {
        res.redirect("/admin/products");
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const productID = req.body.productID;
    productModel.findByIdAndDelete(productID)
    .then(() => {
        res.redirect("/admin/products");
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
    productModel.find()
    .then(products =>{
        res.render("../views/admin/products", {
            pageTitle: "Admin-products",
            prods: products,
            path: '/admin/products'
        })
    }).catch(err => {
        console.log(err);
    });
};