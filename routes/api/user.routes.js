const express = require('express');
const userControllers = require('../../controllers/users.controllers')

const router = express.Router({ mergeParams : true });

router.post('/getAllUsers', userControllers.getAllUsers);
router.post('/getUserByEmail', userControllers.findByEmail);
router.post('/registerUser', userControllers.registerUser);
router.post('/setReview', userControllers.setReview);
router.post('/getUserReviews', userControllers.getUserReviews);
router.post("/readNotification", userControllers.readNotification);

module.exports = router
