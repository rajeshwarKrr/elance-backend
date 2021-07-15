const express = require("express");

const apiRouter = express.Router({ mergeParams : true });

const userRouter = require('./user.routes')
const postsRouter = require('./post.routes')

apiRouter.use('/users', userRouter)
apiRouter.use('/posts', postsRouter)

module.exports = apiRouter
