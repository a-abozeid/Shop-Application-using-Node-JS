const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,   
        required: true
    },
    cart: {
        items:[{
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                requird: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        totalPrice: {
            type: Number,
            requird: true
        }
    }
});

user.methods.addToCart = function(product){
    const cartProductIndex = this.cart.items.findIndex(item => {
        return item.productID.toString() == product._id.toString();
    });
    const cartItems = [...this.cart.items];
    let quantity = 1;
    let productPrice = product.price;

    if(cartProductIndex >= 0){
        quantity += cartItems[cartProductIndex].quantity;
        cartItems[cartProductIndex].quantity = quantity;
        cartItems[cartProductIndex].productPrice = quantity * productPrice;
    }
    else{
        cartItems.push({
            productID: product._id,
            productName: product.title,
            quantity: quantity,
            productPrice: productPrice
        });
    }

    const totalPrice = this.cart.totalPrice + productPrice;
    const cart = {
        items: cartItems,
        totalPrice: totalPrice
    };

    this.cart = cart;
    return this.save();
};

user.methods.deleteCartItem = function(productID){
    return this.populate("cart.items.productID")
    .then(user => {
        const product = user.cart.items.find(item => {
            return item.productID._id.toString() === productID.toString();
        });
        const productPrice = product.quantity * product.productID.price;

        const cartItems = user.cart.items.filter(item => {
            return item.productID._id.toString() !== productID.toString();
        });
        const total = user.cart.totalPrice - productPrice;
    
        user.cart.items = cartItems;
        user.cart.totalPrice = total;
        return user.save();
    })
    .catch(err => console.log(err));
};

user.methods.clearCart = function(){
    this.cart = {items: [], totalPrice: 0};
    return this.save();
}

module.exports = mongoose.model("user", user);