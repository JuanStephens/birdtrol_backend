const mongoose = require("mongoose");

const URI = process.env.MONGOOSE_URI
  ? process.env.MONGOOSE_URI
  : "mongodb://127.0.0.1:27017/bd_birdtroll";

mongoose.connect(URI).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log(err);
  }
);
