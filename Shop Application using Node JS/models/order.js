const mongoose = require("mongoose");

const order = new mongoose.Schema({
    products: [{
        product: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user:{
        userName:{
            type: String,
            required: true
        },
        userID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }
    },
    totalPrice: {
        type: Number,
        requird: true
    }
});

module.exports = mongoose.model("order", order);