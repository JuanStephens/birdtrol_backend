const { Schema, model } = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const User = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  profileImage: {
    type: String,
    default: ""
  },
  descriptionProfile: {
    type: String,
    default: ""
  },
  points: {
    type: Number,
    default: 50,
  },
  premiun: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: [Session],
  },
})

//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

User.plugin(passportLocalMongoose)

module.exports = model("User", User)