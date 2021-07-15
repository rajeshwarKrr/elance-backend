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
        .then((result) => {
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

            const userPosts = User.find({_id: postedBy})
                                    .select({posts: 1})
            console.log(userPosts)

        })
}

module.exports = {
    getAllPosts,
}