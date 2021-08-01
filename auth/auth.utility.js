const isLoggedIn = (req, res, next) => {
    // console.log('req.user', req.isAuthenticated())
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({
            status: 401,
            message: "authorization error",
            // request
        });
    }
}

module.exports = {
    isLoggedIn
}