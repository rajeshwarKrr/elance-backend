const mongoose  = require('mongoose')

const { User, Post} = require("../models")

const getAllPosts = async (req, res) => {
    const posts = await Post.find({})
            .populate('user')
            // .then((result) => "hello")
  
        res.status(200).json({
            message: "posts list",
            posts
        })
    
}

const createPost = async (req, res) => {
    const {
        projectTitle,
        description,
        skills,
        education,
        workLocation,
        softwareRequirements,
        freelancersCount,
        visibility,
        postedBy="current userID",
        budget,
        duration,
    } = req.body

    const post = new Post({
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

    post.save()
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
                                    {_id: postedBy}, 
                                    {$push: { posts: _id } }
                                )
                                .exec()
            res.status(200).json({
                message: "Post added",
                title: projectTitle,
                user: user.userName
            })

        })
}

module.exports = {
    getAllPosts,
    createPost
}