const path = require("path");

exports.get404 = (req, res, next) => {
    res.status(404).render(path.join(__dirname, "../", "views", "404.ejs"), {
        pageTitle: "Page Not Found",
        path: "/",
    });
}