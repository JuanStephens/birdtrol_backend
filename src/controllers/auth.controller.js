const express = require("express")
const router = express.Router();
const User = require("../models/User")
const authCtrl = {};

const { getToken, COOKIE_OPTIONS, getRefreshToken } = require("../authenticate")

authCtrl.signUp = (req, res, next) => {
  if (!req.body.firstName) {
    res.statusCode = 500
    res.send({
      name: "FirstNameError",
      message: "The first name is required",
    })
  } else {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500
          res.send(err)
        } else {
          user.firstName = req.body.firstName
          user.lastName = req.body.lastName || ""
          const token = getToken({ _id: user._id })
          const refreshToken = getRefreshToken({ _id: user._id })
          user.refreshToken.push({ refreshToken })
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500
              res.send(err)
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ success: true, token })
            }
          })
        }
      }
    )
  }
}

authCtrl.signIn = (req, res, next) => {
    const token = getToken({ _id: req.user._id })
    const refreshToken = getRefreshToken({ _id: req.user._id })
    User.findById(req.user._id).then(
      user => {
        user.refreshToken.push({ refreshToken })
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500
            res.send(err)
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send({ success: true, token })
          }
        })
      },
      err => next(err)
    )
  }

module.exports = authCtrl
