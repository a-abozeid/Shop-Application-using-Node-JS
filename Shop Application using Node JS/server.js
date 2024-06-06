const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const controller404 = require("./controllers/404.js");
const userModel = require("./models/user.js");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const mongodbUri = "mongodb+srv://zizo:abdelaziz@cluster0.0cachr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const sessionStorage = new mongoSession({
    uri: mongodbUri,
    collection: "sessions"
});

const csrfProtection = csrf();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStorage
}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    userModel.findById(req.session.user)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.loggedIn,
    res.locals.csrfToken = req.csrfToken();
    next();
});

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const loginRoutes = require("./routes/authentication.js");

app.use("/admin", adminRoutes.Router);
app.use(shopRoutes);
app.use(loginRoutes);
app.use(controller404.get404);

mongoose.connect(mongodbUri)
.then(() => {
    app.listen(2500);
})
.catch(err => console.log(err));