const mongodb = require("mongodb");
const getDb = require("../utils/database.js").getDb;

class product{
    constructor(title, imageUrl, description, price, id, userId){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        if(id){
            this._id = new mongodb.ObjectId(id);
        }
        this.userId = userId;
    }

    save(){
        const dB = getDb();
        let dBOperation;
        if(this._id){
            dBOperation = dB.collection("products").updateOne({_id: this._id}, {$set: this});
        }
        else{
            dBOperation = dB.collection("products").insertOne(this);
        }
        return dBOperation.then(result => {console.log(result)})
        .catch(err => {console.log(err)});
    }

    static getAllProducts(){
        const dB = getDb();
        return dB.collection("products").find().toArray()
        .then(products => {
            return products;
        })
        .catch(err => {console.log(err)});
    }

    static getProductById(id){
        const dB = getDb();
        return dB.collection("products").find({_id: new mongodb.ObjectId(id)}).next()
        .then(product => {
            return product;
        })
        .catch(err => {console.log(err)});
    }

    static deleteProductByID(id){
        const dB = getDb();
        return dB.collection("products").deleteOne({_id: new mongodb.ObjectId(id)})
        .catch(err => {console.log(err)});
    }
}

module.exports = product;