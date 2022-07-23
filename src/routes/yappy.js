const { Router } = require('express');
const router = Router();

const { getPayments } = require('../controllers/yappy.controllers');

router.route('/')
    .post(getPayments);

module.exports = router;