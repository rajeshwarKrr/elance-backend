const express = require('express');
const router = express.Router({ mergeParams : true });

const projectControllers = require('../../controllers/projects.controllers')

router.get('/getAllProjects', projectControllers.getAllProjects);
router.post('/createProject', projectControllers.createProject);
router.post('/apply')

module.exports = router;