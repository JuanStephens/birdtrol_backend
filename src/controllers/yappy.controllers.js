const { v4: uuidv4 } = require("uuid");
const { createClient } = require("yappy-node-back-sdk");
const User = require("../models/User");
const paymentCtrl = {};


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

paymentCtrl.getPayments = async (req, res) => {
  let body = req.body;
  await User.updateOne({ _id: body.id }, {
    $set: {
        premiun: true
    }
  });

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
};


module.exports = paymentCtrl;
