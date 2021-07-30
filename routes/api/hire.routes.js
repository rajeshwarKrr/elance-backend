const express = require('express');
const router = express.Router({ mergeParams : true });


const hireControllers = require('../../controllers/hire.controllers')

router.post('/applyProject', hireControllers.applyProject);
router.post('/getAllAppliedProjects', hireControllers.getAllAppliedProjects);

router.post('/hireApplicant', hireControllers.hireApplicant);
router.post('/rejectApplicant', hireControllers.rejectApplicant);

router.post('/hireRequest', hireControllers.hireRequest);
router.post('/getAllHireRequests', hireControllers.getAllHireRequests);

router.post('/agreeHireRequest', hireControllers.agreeHireRequest);
router.post('/rejectHireRequest', hireControllers.rejectHireRequest);

module.exports = router;