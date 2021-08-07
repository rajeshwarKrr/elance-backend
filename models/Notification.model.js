const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    triggeredBy :{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    notify :{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,

    }, 
    notificationMessage :{
        type: String,
        req: true,
        required: true,

    }, // project applied "project title " by "user name"
    isRead :{
        type: Boolean, 
        default: false,
        required: true,
    },
    projectId: {
        type: mongoose.Schema.ObjectId,
        ref: "project",
    },
    hireRequestId: {
        type: mongoose.Schema.ObjectId,
        ref: "hireRequest",

    },
    applicationId: {
        type: mongoose.Schema.ObjectId,
        ref: "application",

    },
    notificationType: {
        type: String,
        enum : 
        [
            'jobApplication', 
            'hireRequest', 
            'review', 
            'applicantHired', 
            "applicantRejected", 
            "agreeHireRequest", 
            "rejectedHireRequest",
            "message",
            "jobApplicationReminder"
        ],
        required: true,
    }
},
{ timestamps: true })

module.exports = mongoose.model("notification", notificationSchema)