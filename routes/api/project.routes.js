const express = require('express');
const router = express.Router({ mergeParams : true });

const projectControllers = require('../../controllers/projects.controllers')

router.get('/getAllProjects', projectControllers.getAllProjects);
router.post('/createProject', projectControllers.createProject);
router.post('/applyProject', projectControllers.applyProject);
router.get('/getAllAppliedProjects', projectControllers.getAllAppliedProjects)

module.exports = router;