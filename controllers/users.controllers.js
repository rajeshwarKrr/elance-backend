const { User } = require("../models");
const { pagination, queryConditions } = require("../services/request.service")

const getAllUsers = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  const { limit, skip } = pagination({ page, size })

  const conditions = queryConditions(req.body, Object.keys(User.schema.obj));

  const users = await User.find({
    ...conditions
  }, {}, { limit, skip });


  if (users) {
    const skills = users.reduce((a, c) => [...new Set([...a, ...c.skills])], [])
      .reduce((a, c) => [...new Set([...a, c.name])], [])

    const userType = users.reduce((a, c) => [...new Set([...a, c.userType])], [])

    res.status(200).json({
      message: "Users List",
      users,
      filter: {
        skills,
        // qualifications, 
        userType,
      }
    })
  } else {
    res.status(400).json({
      message: "Bad Request"
    })
  }
}

const registerUser = async (req, res) => {
  const {
    email,
    userName,
    ...rest
  } = req.body

  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: "email exists"
        })
      } else {
        const user = new User({
          email, userName, ...rest
        })

        user.save()
          .then(async ({ _id,
            fullName,
            firstName,
            lastName,
            email,
            userName,
            userType,
            occupation,
            intro,
            profilePic,
            phoneNumber,
            address,
            website,
            resume,
            socialProfiles,
            qualifications,
            works,
            skills,
            portfolioProjects,
            reviews }) => {
            console.log('user saved')
            res.status(201).json({
              userDetails: {
                id: _id,
                fullName,
                firstName,
                lastName,
                email,
                userName,
                userType,
                occupation,
                intro,
                profilePic,
                phoneNumber,
                address,
                website,
                resume,
                socialProfiles,
                qualifications,
                works,
                skills,
                portfolioProjects,
                reviews
              }
            })
          })
          .catch((err) => {
            console.log("something went wrong", err)
            res.status(400).json({
              message: err.toString()
            })
          })
      }
    })
    .catch((err) => {
      console.log("something went wrong", err)
      res.status(400).json({
        message: err.toString()
      })
    })
}

const findByEmail = async (req, res) => {
  const { email } = req.body;
  console.log("email", email)
  const user = await User.find({ email }).exec()
  console.log("user", user);
  if (user.length) {
    res.status(200).json({
      message: "User Found",
      user,
    })
  } else {
    res.status(400).json({
      message: "Bad Request"
    })
  }

}

const setReview = async (req, res) => {
  const {
    userId,
    reviewedBy,
    title,
    description,
    rating,
  } = req.body;

  await User.findByIdAndUpdate(
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
    }).then(async (result1) => {
      await User.findByIdAndUpdate(reviewedBy, {
        $push: {
          reviewed: result1._id
        }
      }).then((result2) => {
        res.status(200).json({
          message: "Review Added",
          title,
          description,
          rating,
          reviewedBy: result2.email,
          user: result1
        })
      })
    })
}

const getUserReviews = async (req, res) => {
  const { userId } = req.body;
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
  }).then((result) => {
    res.status(200).json({
      message: "Reviews of User",
      reviews: result,
      userId: result._id,
    })
  })
}


module.exports = {
  getAllUsers,
  registerUser,
  findByEmail,
  setReview,
  getUserReviews,
}
