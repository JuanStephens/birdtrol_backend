const { Router } = require("express");
const router = Router();
const passport = require("passport");

const {
  signUp,
  signIn,
  refreshToken,
  Me,
  logout,
} = require("../controllers/auth.controller");

const {
        verifyUser,
      } = require("../authenticate");

router.route("/").post(signUp);

router.route("/login").post(passport.authenticate("local"), signIn);

router.route("/refreshToken").post(refreshToken);

router.route("/me").get(verifyUser, Me);

router.route("/logout").delete(verifyUser, logout);

module.exports = router;
