const { Router } = require("express");
const router = Router();
const passport = require("passport");
const User = require("../models/User")

const { signUp, signIn } = require("../controllers/auth.controller");
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate");

router.route("/")
        .post(signUp)
        .get(passport.authenticate("local"), signIn);


module.exports = router;
