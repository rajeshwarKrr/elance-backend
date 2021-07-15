const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    skills: [{
        type: String,
        required: true,
    }],
    education: [{
        type: String, 
    }], 
    workLocation: [{
        type: String,
        default: "remote"
    }], 
    softwareRequirements: [{
        type: String
    }], 
    freelancersCount: {
        type: Number, 
        required: true
    },
    duration: {
        from: {
            type: String, 
            trim: true, 
            default: ''
        },
        to: {
            type: String, 
            trim: true, 
            default: ''
        },
    }, 
    visibility: [{
        type: String,
    }], 
    budget: {
        minPrice: Number,
        maxPrice: Number,
        currency: String
    }, 
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    }
})


module.exports = mongoose.model("post", postSchema)