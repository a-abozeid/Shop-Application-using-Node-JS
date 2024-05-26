const getDb = require("../utils/database.js").getDb;

class product{
    constructor(title, imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save(){
        const dB = getDb();
        dB.collection("products").insertOne(this)
        .then(result => {console.log(result)})
        .catch(result => {console.log(result)});
    }

}

module.exports = product;