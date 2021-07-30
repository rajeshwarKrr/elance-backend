const express = require('express');
const router = express.Router({ mergeParams : true });

const projectControllers = require('../../controllers/projects.controllers')

router.post('/getAllProjects', projectControllers.getAllProjects);
router.post('/createProject', projectControllers.createProject);
// router.post('/applyProject', projectControllers.applyProject);
// router.post('/getAllAppliedProjects', projectControllers.getAllAppliedProjects)

module.exports = router;
