const { Router } = require('express');
const router = Router();

const { loadImgProfile } = require('../controllers/imgprofile.controller');

router.route('/')
    .post(loadImgProfile);

module.exports = router;
