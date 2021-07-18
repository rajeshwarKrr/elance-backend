const express = require('express');
const userControllers = require('../../controllers/users.controllers')

const router = express.Router({ mergeParams : true });

router.get('/getAllUsers', userControllers.getAllUsers);
router.post('/getUserByEmail', userControllers.findByEmail)
router.post('/registerUser', userControllers.registerUser);

module.exports = router
