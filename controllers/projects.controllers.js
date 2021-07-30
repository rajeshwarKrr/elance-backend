const mongoose = require('mongoose')

const { User, Project, Application } = require("../models");
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
        postedBy,
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
                    { $push: { projects: _id } },
                    { new: true}
                )
                .exec()
            res.status(200).json({
                message: "Project added",
                title: projectTitle,
                user: user?.userName
            })

        })
}


module.exports = {
    getAllProjects,
    createProject,
}
