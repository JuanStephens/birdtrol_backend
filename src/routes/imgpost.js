const { Router } = require('express');
const router = Router();

const { loadImgPost } = require('../controllers/imgpost.controller');

router.route('/')
    .post(loadImgPost);

module.exports = router;