const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userCtrl = {};

userCtrl.changeImageProfile = async (req, res, next) => {
    const { username, imageProfile } = req.body;
    console.log(username);
    try {
        await User.updateOne(
          { username },
          {
            $set: {
                profileImage : imageProfile,
            },
          }
        );
        res.json("User update");
      } catch (e) {
        res.json(e.errmsg);
      }
}

module.exports = userCtrl;
