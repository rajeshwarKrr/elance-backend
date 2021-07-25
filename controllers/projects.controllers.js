const mongoose = require('mongoose')

const { User, Project, Application } = require("../models")
const { pagination, queryConditions } = require("../services/request.service")


const getAllProjects = async (req, res) => {
    const { page = 1, size = 10 } = req.query;
    const { limit, skip } = pagination({ page, size })

    const conditions = queryConditions(req.body, Object.keys(Project.schema.obj));


    const projects = await Project.find({ ...conditions }, {}, { limit, skip })
        .populate({
            path: "postedBy",
            model: "user",
            select: { userName: 1 }
        })
        .populate({
            path: "appliedBy.userId",
            model: "user",
            select: { userName: 1 }
        })
        .populate({
            path: "appliedBy.applicationId",
            model: "application",
            select: { description: 1 }
        })

    const skills = projects.reduce((a, c) => [...new Set([...a, ...c.skills])], [])
    const education = projects.reduce((a, c) => [...new Set([...a, ...c.education])], [])
    const visibility = projects.reduce((a, c) => [...new Set([...a, ...c.visibility])], [])

    console.log(skills)
    res.status(200).json({
        message: "projects list",
        projects,
        filter: {
            skills,
            education,
            visibility,
        }
    })
}

const createProject = async (req, res) => {
    const {
        projectTitle,
        description,
        skills,
        education,
        workLocation,
        softwareRequirements,
        freelancersCount,
        visibility,
        postedBy = "current userID",
        budget,
        duration,
    } = req.body

    const project = new Project({
        projectTitle,
        description,
        skills,
        education,
        workLocation,
        softwareRequirements,
        freelancersCount,
        visibility,
        postedBy,
        budget,
        duration,
    })

    project.save()
        .then(async (result) => {
            const {
                _id,
                projectTitle,
                postedBy,
            } = result

            const user = await User
                .findOneAndUpdate(
                    { _id: postedBy },
                    { $push: { projects: _id } }
                )
                .exec()
            res.status(200).json({
                message: "Project added",
                title: projectTitle,
                user: user.userName
            })

        })
}

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
            const user = await User
                .findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            applications: {
                                projectId,
                                applicationId: _id
                            }
                        }
                    }, {new : true}
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
                    }
                ).exec()

            res.status(200).json({
                message: "Project Applied",
                userId,
                user: user.userName,
                projectId,
                projectTitle: project.projectTitle,
                applicationId: _id,
            })
        })
}

const getAllAppliedProjects = async (req, res) => {
    const { page = 1, size = 10 } = req.query;

    const { limit, skip } = pagination({page, size})

    const conditions = queryConditions(req.body, Object.keys(Application.schema.obj));
  
    const applications = await Application.find({...conditions}, {}, { limit, skip })
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

module.exports = {
    getAllProjects,
    createProject,
    applyProject,
    getAllAppliedProjects
}