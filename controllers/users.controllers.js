const mongoose = require("mongoose")
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if(users) {
    res.status(200).json({
      message: "Users List",
      users
    })
  } else {
    res.status(400).json({
      message: "Bad Request"
    })
  }
}

const register = async (req, res) => {
  const {
    username,
    email,
    password,
    displayName
  } = req.body

  User.find({ email})
  .exec()
  .then((user) => {
    if(user.length >= 1) {
      res.status(409).json({
        message: "email exists"
      })
    } else {
      const user = new User({
        username,
        email,
        password,
        displayName
      })

      user.save()
        .then(async (result) => {
          console.log('user saved')
          res.status(201).json({
            userDetails: {
              id: result._id,
              username:result.username,
              email:result.email,
              password:result.password,
              displayName:result.displayName
            }
          })
        })
        .catch((err) => {
          console.log("something went wrong",err)
          res.status(400).json({
            message: err.toString()
          })
        })
    }
  })
  .catch((err) => {
    console.log("something went wrong",err)
    res.status(400).json({
      message: err.toString()
    })
  })
}
// User.findById(args.id)
const findByEmail = async (req, res) => {
  const { email } = req.query;
  console.log("email", email)
  const user = await User.find({ email }).exec()
  console.log("user", user);
  if(user.length) {
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

module.exports = {
  getAllUsers,
  register,
  findByEmail,
}
