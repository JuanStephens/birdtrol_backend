const { Router } = require('express');
const router = Router();

const { getPosts, createPost, deletePost } = require('../controllers/posts.controllers');

router.route('/')
    .get(getPosts)
    .post(createPost);

router.route('/:id')
    .delete(deletePost);

module.exports = router;
