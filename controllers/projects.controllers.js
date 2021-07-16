const mongoose = require('mongoose')

const { User, Project } = require("../models")

const getAllProjects = async (req, res) => {
    const projects = await Project.find()
        .populate({
            path: "postedBy",
            model: "user",
            select: { userName: 1 }
        }).lean()
        
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

module.exports = {
    getAllProjects,
    createProject
}