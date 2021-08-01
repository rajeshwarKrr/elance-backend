const { User, Project } = require("../models");
const { pagination } = require("../services/utility.service")

const createProjectService = async (bodyArgs) => {
    const project = new Project({
        ...bodyArgs
    })
    const err = await project.validateSync()
    if(err) {
        return ({
            status: 400,
            message: "Something went wrong",
            err,
        })
    } else {
        const projectSave = await project.save()

        const userUpdate = await User.findOneAndUpdate(
            { _id: projectSave?.postedBy },
            { $push: { projects: projectSave?._id } },
            {
                runValidators: true,
                new: true
            }
        )
    
        return ({
            status: 200, 
            message: "Project added",
            projectId: projectSave?._id,
            title: projectSave?.projectTitle,
            user: userUpdate?.userName
        })
    
    }

}

const getAllProjectsService = async ({ page, size, conditions }) => {

    const { limit, skip } = pagination({ page, size })
    const count = await Project.find({ ...conditions }).count()
    const totalPages = count / size;

    const projects = await Project.find({ ...conditions }, {}, { limit, skip })
        .populate("postedBy")
        .populate({
            path: "appliedBy.userId",
            model: "user",
            select: { userName: 1, email: 1 }
        })
        .populate({
            path: "appliedBy.applicationId",
            model: "application",
            select: { description: 1, email: 1 }
        })

    if(projects.length >= 1) {
        const skills = projects.reduce((a, c) => [...new Set([...a, ...c.skills])], [])
        const education = projects.reduce((a, c) => [...new Set([...a, ...c.education])], [])
        const visibility = projects.reduce((a, c) => [...new Set([...a, ...c.visibility])], [])
        
        return ({
            status: 200,
            message: "Projects List",
            projects,
            totalPages,
            page,
            filter: {
                skills,
                education,
                visibility
            }
        })
    } else {
        return ({
            status: 200,
            message: "Bad Request"
        })
    }
}

module.exports = {
    createProjectService,
    getAllProjectsService
}