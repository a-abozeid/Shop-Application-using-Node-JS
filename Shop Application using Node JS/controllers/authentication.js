const bcrypt = require("bcryptjs");

const userModel = require("../models/user");

exports.getLogin = (req, res, next) => {
    let message = req.flash("error");
    if(message.length == 0){
        message = null;
    }
    res.render("../views/auth/login", {
        pageTitle: "Login",
        path: '/login',
        isAuthenticated: false,
        errorMessage: message
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    userModel.findOne({email: email})
    .then(user => {
        if(!user){
            req.flash("error", "invalid email or password");
            res.redirect("/login");
        }
        else{
            bcrypt.compare(password, user.password)
            .then(match => {
                if(match) {
                    req.session.loggedIn = true;
                    req.session.user = user._id;
                    req.session.save(() => {
                        res.redirect("/");
                    });
                }
                else{
                    req.flash("error", "invalid email or password");
                    res.redirect("/login");
                }
            });
        }
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
};

exports.getSignup = (req, res, next) => {
    let message = req.flash("error");
    if(message.length == 0){
        message = null;
    }
    res.render("../views/auth/signup", {
        pageTitle: "Signup",
        path: '/signup',
        isAuthenticated: false,
        errorMessage: message
    });
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    userModel.findOne({email: email})
    .then(user => {
        if(user){
            req.flash("error", "user email already exsits");
            return res.redirect("/signup");
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new userModel({
                email: email,
                password: hashedPassword,
                cart: {
                    items: [],
                    totalPrice: 0
                }
            });
            return user.save();
        })
        .then(() => res.redirect('/login'));
    })
    .catch(err => console.log(err));
}