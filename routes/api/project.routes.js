const express = require('express');
const router = express.Router({ mergeParams : true });

const projectControllers = require('../../controllers/projects.controllers')

router.post('/getAllProjects', projectControllers.getAllProjects);
router.post('/createProject', projectControllers.createProject);

module.exports = router;
