const express = require("express");

const apiRouter = express.Router({ mergeParams : true });

const userRouter = require('./user.routes')
const projectsRouter = require('./project.routes')

apiRouter.use('/users', userRouter)
apiRouter.use('/projects', projectsRouter)

module.exports = apiRouter
