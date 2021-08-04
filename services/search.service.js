const { User, Project } = require("../models");

const { pagination } = require("./utility.service");
const { userGenericSelect,
    projectGenericSelect } = require("./service.constants")
const searchService = async ({ searchString, page, size }) => {
    const { limit, skip } = pagination({ page, size })

    const users = await User.find(
        {
            $text: { $search: searchString },
        }, {
        "score": { "$meta": "textScore" }
    }, { limit, skip }).sort({ "createdAt": -1, "score": { "$meta": "textScore" } })
        .select(userGenericSelect)

    const projects = await Project.find(
        { $text: { $search: searchString } }, {
        "score": { "$meta": "textScore" }
    }, { limit, skip }).sort({ "createdAt": -1, "score": { "$meta": "textScore" } })
        .select(projectGenericSelect)

    const userCount = await User.find(
        { $text: { $search: searchString } }, {
    }).count()


    const projectCount = await Project.find(
        { $text: { $search: searchString } }, {
    }).count()


    const totalUserPages = Math.ceil(userCount / size);
    const totalProjectPages = Math.ceil(projectCount / size)

    if (users.length >= 1 || projects.length >= 1) {
        return ({
            message: "search done",
            status: 200,
            users,
            projects,
            page,
            totalUserPages,
            totalProjectPages
        })
    }
    else {
        return ({
            message: "Bad Request",
            status: 400
        })
    }
}

module.exports = {
    searchService
}
