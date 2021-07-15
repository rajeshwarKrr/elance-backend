const express = require('express');
const router = express.Router({ mergeParams : true });

const postControllers = require('../../controllers/posts.controllers')

router.get('/getAllPosts', postControllers.getAllPosts);

module.exports = router;