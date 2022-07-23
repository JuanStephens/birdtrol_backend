const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { createClient } = require("yappy-node-back-sdk");
const passport = require("passport")
require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate");

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

let yappyClient = createClient(process.env.MERCHANT_ID, process.env.SECRET_KEY);

const payment = {
  total: null,
  subtotal: null,
  shipping: 0.0,
  discount: 0.0,
  taxes: null,
  orderId: null,
  successUrl: "https://www.yappy.peqa.dev?pid=123123123123&status=success",
  failUrl: "https://www.yappy.peqa.dev?pid=123123123123&status=error",
  tel: process.env.TEL || "66666666",
  domain: process.env.DOMAIN || "https://yappy.peqa.dev",
};

// middlewares
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static("upload"));
app.use(passport.initialize());
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(
  "/img/imgprofile",
  express.static(path.join(__dirname, path.join("upload", "img_profiles")))
);
app.use(
  "/img/imgpost",
  express.static(path.join(__dirname, path.join("upload", "img_posts")))
);

// routes
app.use("/api/posts", require("./routes/posts"));
app.use("/api/imgpost", require("./routes/imgpost"));
app.use("/api/imgprofile", require("./routes/imgprofile"));
app.use("/auth", require("./routes/auth"));
app.use("/api/pagosbg", require("./routes/yappy"));
/*
app.post("/api/pagosbg", async (req, res) => {

  const { name, price: subtotal } = req.body;
  const uuid = uuidv4();
  const taxes = Number((subtotal * 0.07).toFixed(2));
  const total = subtotal + taxes;
  const newPayment = {
    ...payment,
    subtotal: 0.01, // Para evitar tener que pagar durante la prueba
    taxes: 0.01, // Para evitar tener que pagar durante la prueba
    total: 0.02, // Para evitar tener que pagar durante la prueba
    orderId: uuid.split("-").join("").slice(0, 10),
  };
  const response = await yappyClient.getPaymentUrl(newPayment);
  res.json(response);
});
*/


module.exports = app;
