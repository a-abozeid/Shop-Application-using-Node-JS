const express = require("express");

const loginController = require("../controllers/login.js");

const router = express.Router();

const getLogin = loginController.getLogin;
const postLogin = loginController.postLogin;

router.get("/login", getLogin);
router.post("/login", postLogin);

module.exports = router;
