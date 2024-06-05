const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);

const controller404 = require("./controllers/404.js");
const userModel = require("./models/user.js");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const sessionStorage = new mongoSession({
    uri: "mongodb+srv://zizo:abdelaziz@cluster0.0cachr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    collection: "sessions"
});

app.use((req, res, next) => {
    userModel.findById("665f452862af259f7ff23a09")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
});

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const loginRoutes = require("./routes/login.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStorage
}));

app.use("/admin", adminRoutes.Router);
app.use(shopRoutes);
app.use(loginRoutes);
app.use(controller404.get404);

mongoose.connect("mongodb+srv://zizo:abdelaziz@cluster0.0cachr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    return userModel.findOne();
})
.then(user => {
    if(!user){
        const user = new userModel({
            name: "zizo",
            email: "zizo@test.com",
            cart: {
                items: [],
                totalPrice: 0
            }
        })
        return user.save();
    }
})
.then(() => {
    app.listen(2500);
})
.catch(err => console.log(err));