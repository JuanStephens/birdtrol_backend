const { Router } = require('express');
const router = Router();

const { changeImageProfile } = require('../controllers/user.controller');

router.route('/')
    .post(changeImageProfile)

module.exports = router;
