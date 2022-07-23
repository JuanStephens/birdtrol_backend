const { Router } = require('express');
const router = Router();

const { getPosts, createPost, deletePost, updatePost } = require('../controllers/posts.controllers');

router.route('/')
    .get(getPosts)
    .post(createPost)
    .put(updatePost)

router.route('/:id')
    .delete(deletePost);

module.exports = router;
