const express = require("express");

const loginController = require("../controllers/authentication.js");

const router = express.Router();

const getLogin = loginController.getLogin;
const postLogin = loginController.postLogin;
const postLogout = loginController.postLogout;
const getSignup = loginController.getSignup;
const postSignup = loginController.postSignup;

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.get("/signup", getSignup);
router.post("/signup", postSignup);

module.exports = router;
