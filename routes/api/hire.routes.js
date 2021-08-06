const express = require('express');
const router = express.Router({ mergeParams : true });


const hireControllers = require('../../controllers/hire.controllers');
const { useTryCatch } = require('../../services/utility.service');

router.post('/applyProject', useTryCatch(hireControllers.applyProject));  // freelancer to client 
router.post('/getAllAppliedProjects', useTryCatch(hireControllers.getAllAppliedProjects));

router.post('/hireApplicant', useTryCatch(hireControllers.hireApplicant)); // client to freelancer 
router.post('/rejectApplicant', useTryCatch(hireControllers.rejectApplicant)); // client to freelancer

router.post('/hireRequest', useTryCatch(hireControllers.hireRequest)); // client to freelancer 
router.post('/getAllHireRequests', useTryCatch(hireControllers.getAllHireRequests));

router.post('/agreeHireRequest', useTryCatch(hireControllers.agreeHireRequest)); // freelancer to client 
router.post('/rejectHireRequest', useTryCatch(hireControllers.rejectHireRequest)); // freelancer to client

router.post('/remindJobApplication', useTryCatch(hireControllers.remindJobApplication)); // freelancer to client

module.exports = router;