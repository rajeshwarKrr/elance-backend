const { User, Project, Application } = require("../models");
const { pagination, queryConditions } = require("../services/request.service")
const { setNotification } = require('../services/notification.service');
const { hireAndRejectService, hireRequestService, getAllHireRequestsService, agreeRejectHireService } = require("../services/hire.service");


const applyProject = async (req, res) => {
    const {
        projectId,
        userId,
        description,
        bid,
        duration,
        coverLetter,
        attachmentLinks,
    } = req.body;

    const application = new Application({
        projectId,
        userId,
        description,
        bid,
        duration,
        coverLetter,
        attachmentLinks
    })

    application.save()
        .then(async ({ _id, projectId, userId }) => {

            const freelancer = await User
                .findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            applications: {
                                projectId,
                                applicationId: _id
                            },
                        }
                    }, { new: true }
                ).exec()
            const project = await Project
                .findOneAndUpdate(
                    { _id: projectId },
                    {
                        $push: {
                            appliedBy: {
                                userId,
                                applicationId: _id
                            }
                        }
                    }, { new: true }
                ).exec()

            const notification = await setNotification({
                triggeredBy: freelancer._id,
                notify: project.postedBy,
                notificationMessage: `${project.projectTitle} applied `,
                projectId: project._id,
                notificationType: "jobApplication"
            })

            res.status(200).json({
                message: "Project Applied",
                freelancerId: freelancer?._id,
                freelancer: freelancer.userName,
                projectId,
                projectTitle: project.projectTitle,
                applicationId: _id,
                notificationId: notification._id
            })
        })
}

const getAllAppliedProjects = async (req, res) => {
    const { page = 1, size = 10 } = req.query;

    const { limit, skip } = pagination({ page, size })

    const conditions = queryConditions(req.body, Object.keys(Application.schema.obj));

    const applications = await Application.find({ ...conditions }, {}, { limit, skip })
        .populate({
            path: "projectId",
            model: "project",
            select: { projectTitle: 1 }
        })
        .populate({
            path: "userId",
            model: "user",
            select: { userName: 1, "skills.name": 1 }
        })

    res.status(200).json({
        message: "All Applied Projects",
        applications,

    })

}

const hireApplicant = async (req, res) => {
    const {
        applicationId,
        clientId,
    } = req.body

    const {
        message,
        freelancerId,
        projectId,
        notificationId

    } = await hireAndRejectService({
        applicationId,
        applicationStatus: "hired",
        clientId
    })

    res.status(200).json({
        message,
        freelancerId,
        clientId,
        projectId,
        notificationId
    })
}

const rejectApplicant = async (req, res) => {
    const {
        applicationId,
        clientId,
    } = req.body

    const {
        message,
        freelancerId,
        projectId,
        notificationId
    } = await hireAndRejectService({
        applicationId,
        applicationStatus: "rejected",
        clientId
    })

    res.status(200).json({
        message,
        freelancerId,
        clientId,
        projectId,
        notificationId
    })

}

const hireRequest = async (req, res) => {
    const {
        projectId,
        freelancerId,
        clientId,
        duration,
        hourlyRate,
        description,
    } = req.body

    const result = await hireRequestService({
        projectId,
        freelancerId,
        clientId,
        duration,
        hourlyRate,
        description,
    })

    res.status(200).json({
        message: "Hire Request Sent",
        hireRequest: result.hireRequest,
        projectId: result.projectId,
        freelancerId: result.freelancerId,
        clientId: result.clientId,
        notificationId: result.notificationId,
    })

}

const getAllHireRequests = async (req, res) => {
    const {
        freelancerId
    } = req.body

    const hireRequests = await getAllHireRequestsService({ freelancerId })

    res.status(200).json({
        message: "All hireRequests",
        hireRequests,
    })
}

const agreeHireRequest = async (req, res) => {
    const { hireRequestId } = req.body;

    const {
        message,
        freelancerId,
        projectId,
        notificationId,
    } = await agreeRejectHireService({
        hireRequestId, 
        hireRequestStatus : "agreed"
    })

    res.status(200).json({
        message,
        freelancerId,
        projectId,
        notificationId,
        hireRequestId,
    })
}

const rejectHireRequest = async (req, res) => {
    const { hireRequestId } = req.body;

    const {
        message,
        freelancerId,
        projectId,
        notificationId,
    } = await agreeRejectHireService({
        hireRequestId, 
        hireRequestStatus : "rejected"
    })

    res.status(200).json({
        message,
        freelancerId,
        projectId,
        notificationId,
        hireRequestId,
    })

}

module.exports = {
    applyProject,
    getAllAppliedProjects,
    hireApplicant,
    rejectApplicant,
    hireRequest,
    getAllHireRequests,
    agreeHireRequest,
    rejectHireRequest,
}