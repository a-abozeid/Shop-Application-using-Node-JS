exports.getLogin = (req, res, next) => {
    res.render("../views/auth/login", {
        pageTitle: "LogIn",
        path: '/login',
        isAuthenticated: false
    })
};

exports.postLogin = (req, res, next) => {
    req.session.loggedIn = true;
    res.redirect("/");
};