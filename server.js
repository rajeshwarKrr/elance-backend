const express = require("express")
var logger = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
const passport = require('passport');
const { isLoggedIn } = require('./auth/auth.utility')

const { connectDB } = require("./db");
// routers
const apiRouter = require("./routes/api")

const app = express();


// Allow Origins according to your need.
corsOptions = {
  'origin': '*'
};

dotenv.config()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());



connectDB()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err))

// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

require('./auth/passport.setup')(passport);


app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Its elance - Backend" })
})
app.use("/api/v1",  apiRouter);

app.use('/auth/google/callback', passport.authenticate('google', 
  { 
    scope: ['profile','email'], 
  }), 
  (req, res) => {
    console.log("req=========================", req.user)
    // set cookie
    res
      .cookie("token", req.user.verificationToken, {
        // httpOnly: true
        // same site : false 
      })
      // .json({user: req.user, isAuthenticated: req.isAuthenticated()})
      .redirect(``)
  }
);

app.get('/protected/:id',  isLoggedIn, (req, res) => {
  res.send(`Hello ${req.params.id}`);
})

// app.get('/logout', (req, res) => {
//   req.session = null;
//   req.logout();
//   res.redirect('/');
// })

// catch 404 and forward to error handler
app.use('*', function (req, res) {
  res.status(404).json({
    status: 404,
    message: "Bad Request"
  })
});

// error handler middleware
app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`)
})
