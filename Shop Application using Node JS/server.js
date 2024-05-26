const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const controller404 = require("./controllers/404.js");
const mongoConnect = require("./utils/database.js").mongoConnect;

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// const adminRoutes = require("./routes/admin.js");
// const shopRoutes = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// app.use("/admin", adminRoutes.Router);
// app.use(shopRoutes);
app.use(controller404.get404);

mongoConnect(() => {
    app.listen(2500);
});