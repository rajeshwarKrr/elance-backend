const express = require("express");

const apiRouter = express.Router({ mergeParams : true });
const userRouter = require('./user.routes')

apiRouter.use('/users', userRouter)

module.exports = apiRouter
