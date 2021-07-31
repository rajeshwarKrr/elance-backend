const { User } = require("../models");
const { setNotification } = require("./notification.service");
const { pagination } = require("./utility.service");

const userFindService = async (conditions, limit = null, skip = null) => {
    const user = await User.find({ ...conditions }, {}, { limit, skip })
    return user;
}

const getAllUsersService = async ({conditions, page, size}) => {
    
    const { limit, skip } = pagination({ page, size })

    const users = await User.find({ ...conditions }, {}, { limit, skip })
        .populate("notifications");
    const count = await User.find({ ...conditions }).count()
    const totalPages = count / size;

    if (users) {
        const skills = users.reduce((a, c) => [...new Set([...a, ...c.skills])], [])
          .reduce((a, c) => [...new Set([...a, c.name])], [])
    
        const userType = users.reduce((a, c) => [...new Set([...a, c.userType])], [])
    
        return ({
          message: "Users List",
          status: 200,
          users,
          page, 
          size,
          totalPages,
          filter: {
            skills,
            // qualifications, 
            userType,
          }
        })
      } else {
        return ({
          message: "Bad Request",
          status: 400
        })
      }
    

}

const registerUserService = async ({ email, ...rest }) => {
    const user = await userFindService({ email })

    if (user.length >= 1) {
        return ({
            message: "User Already Exists with the same Email Id",
            status: 403
        })
    } else {
        const newUser = new User({
            email, ...rest
        })
        const err = await newUser.validateSync();
        if (err) {
            return ({
                message: `Something went Wrong`,
                status: 400,
                err,
            })
        } else {
            const newUserSave = await newUser.save()
            return ({
                message: "User Registered",
                userDetails: newUserSave,
                status: 200,
            })
        }
    }
}

const setReviewService = async ({
    userId,
    reviewedBy,
    title,
    description,
    rating,
}) => {

    const userUpdate = await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                reviews: {
                    reviewedBy,
                    title,
                    description,
                    rating,
                }
            }
        },
        {
            runValidators: true,
            new: true
        })

    const reviewerUpdate = await User.findByIdAndUpdate(reviewedBy, {
        $push: {
            reviewed: userUpdate._id
        }
    }, {
        runValidators: true,
        new: true
    })

    const notification = await setNotification({
        triggeredBy: reviewedBy,
        notify: userId,
        notificationMessage: "Got a Review",
        notificationType: "review",
    })

    const user = await User.find({ _id: userUpdate?._id })

    return ({
        reviewedBy: reviewerUpdate?.email,
        user,
        notification: notification?._id,
        status: 200
    })

}

const getUserReviewsService = async ({
    userId
}) => {

    const userReviews = await User.findById(userId, {
        email: 1,
        reviews: 1,
    }).populate({
        path: "reviews.reviewedBy",
        model: "user",
        select: {
            _id: 1,
            userName: 1,
            reviewed: 1
        }
    })

    return ({
        reviews: userReviews,
        userId: userReviews?._id
    })
}

module.exports = {
    userFindService,
    getAllUsersService,
    registerUserService,
    setReviewService,
    getUserReviewsService,
}