const express = require('express');
const userControllers = require('../../controllers/users.controllers')

const router = express.Router({ mergeParams : true });

router.get('/all', userControllers.getAllUsers);
router.get('/user', userControllers.findByEmail)
router.post('/register', userControllers.register);

module.exports = router
