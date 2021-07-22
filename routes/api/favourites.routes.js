const express = require('express');
const router = express.Router({ mergeParams : true });

const favouritesControllers = require('../../controllers/favourites.controllers')

router.post('/setFavUser', favouritesControllers.setFavUser);
router.post('/unSetFavUser', favouritesControllers.unSetFavUser);
router.get('/getAllFavUsers', favouritesControllers.getAllFavUsers);

router.post('/setFavProject', favouritesControllers.setFavProject);
router.post('/unSetFavProject', favouritesControllers.unSetFavProject);
// router.get('/getAllFavProjects', )

module.exports = router;