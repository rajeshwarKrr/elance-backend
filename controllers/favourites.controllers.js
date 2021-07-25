const { User, Project } = require("../models");

const { pagination, queryConditions } = require("../services/request.service")

const setFavUser = async (req, res) => {
    const {
        favouriteUserId, 
        userId
    } = req.body

    const result = await User.findByIdAndUpdate(
        userId, {
            $addToSet: {
                favUsers: favouriteUserId   
            }
        }, {new : true}
    )



    // .then((result) => {
    //     console.log(result)
        res.status(200).json({
            message: "Favourite User Added",
            userId: result._id,
            favUsers: result.favUsers
        })
    // })
    
}

const unSetFavUser = async (req, res) => {
    const {
        favouriteUserId, 
        userId
    } = req.body

    await User.findByIdAndUpdate(
        userId, {
            $pull: {
                favUsers: favouriteUserId   
            }
        }, {new : true}
    ).exec()
    .then((result) => {
        res.status(200).json({
            message: "Favourite User Removed",
            userId: result._id,
            favUsers: result.favUsers
        })
    })
}

const getAllFavUsers = async (req, res) => {
    const { page = 1, size = 10 } = req.query;

    const { limit, skip } = pagination({page, size})
    const { userId } = req.body
    const users = await User.findById(
        userId, 
        {_id: 1, favUsers: 1}, 
        { limit, skip }
        ).populate({
            path: "favUsers", 
            model: "user",
            select:{
                email: 1, 
                _id: 1, 
                userType:1, 
                favProjects: 1
            }
        })

    res.status(200).json({
        message: "All Applied Projects",
        users,

    })

}

const setFavProject = async (req, res) => {
    const {
        favProjectId, 
        userId
    } = req.body;

    await Project.findByIdAndUpdate(
        favProjectId, {
            $addToSet: {
                favByUsers: userId   
            }
        }, {new : true}
    )
    .exec()
    .then(async (result) => {
        await User.findByIdAndUpdate(userId,{
            $addToSet: {
                favProjects: result._id   
            }
        }, {new : true}).then((result2) => {
            res.status(200).json({
                message: "Favourite Project Added",
                projectId: result._id,
                favByUsers: result.favByUsers,
                favUser: result2._id
            })
        })

    }) 
}

const unSetFavProject = async (req, res) => {
    const {
        favProjectId, 
        userId
    } = req.body;

    await Project.findByIdAndUpdate(
        favProjectId, {
            $pull: {
                favByUsers: userId   
            }
        }, {new : true}
    )
    .exec()
    .then(async (result) => {
        await User.findByIdAndUpdate(userId,{
            $pull: {
                favProjects: result._id   
            }
        }, {new : true}).then((result2) => {
            res.status(200).json({
                message: "Favourite Project Added",
                projectId: result._id,
                favByUsers: result.favByUsers,
                favUser: result2._id
            })
        })

    }) 
}

module.exports = {
    setFavUser,
    unSetFavUser, 
    getAllFavUsers,
    setFavProject,
    unSetFavProject,
}