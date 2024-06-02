const mongodb = require("mongodb");
const getDb = require("../utils/database.js").getDb;

class user{
    constructor(email, userName, cart, id){
        this.email = email;
        this.userName = userName;
        this.cart = cart;
        this._id = id;
    }

    save(){
        const dB = getDb();
        return dB.collection("users").insertOne(this)
        .catch(err => console/log(err));
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productID.toString() === product._id.toString();
        });

        let quantity = 1;
        const cartItems = [...this.cart.items];

        if(cartProductIndex >= 0){
            quantity = this.cart.items[cartProductIndex].quantity + 1;
            cartItems[cartProductIndex].quantity = quantity;
        }
        else{
            cartItems.push({
                productID: new mongodb.ObjectId(product._id),
                quantity: quantity
            });
        }

        const cart = {items: cartItems};
        // const cart = {items: [{productID: new mongodb.ObjectId(product._id), quantity: 1}]};
        const dB = getDb();
        return dB.collection("users").updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: cart}});
    }

    getCart(){
        const dB = getDb();
        const productIDs = this.cart.items.map(item => {
            return item.productID;
        });

        return dB.collection("products").find({_id: {$in: productIDs}}).toArray()
        .then(products => {
            return products.map(product =>{
                return {
                    ...product,
                    quantity: this.cart.items.find(item =>{
                        return item.productID.toString() === product._id.toString();
                    }).quantity
                };
            });
        })
        .catch(err => console.log(err));
    }

    deleteCartItem(productID){
        const cartItems = this.cart.items.filter(item => {
            return item.productID.toString() !== productID.toString();
        });

        const dB = getDb();
        return dB.collection("users").updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: {items: cartItems}}});
    }

    addOrder(){
        const dB = getDb();
        return this.getCart()
        .then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    email: this.email
                }
            };

            return dB.collection("orders").insertOne(order)
        })
        .then(() => {
            this.cart = {items: []}
            return dB.collection("users").updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: {items: []}}});
        })
        .catch(err => comsole.log(err));;
    }

    getOrders(){
        const dB = getDb();
        return dB.collection("orders").find({"user._id": new mongodb.ObjectId(this._id)}).toArray();
    }

    static getUserById(id){
        const dB = getDb();
        return dB.collection("users").find({_id: new mongodb.ObjectId(id)}).next()
        .then(user => {
            return user;
        })
        .catch(err => {console.log(err)});
    }
}

module.exports = user;