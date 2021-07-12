const express = require("express")
var logger = require('morgan');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require( 'cors' );

const { connectDB } = require("./db");
// routers
const apiRouter = require("./routes/api")

const app = express()
// Allow Origins according to your need.
corsOptions = {
    'origin': '*'
};

dotenv.config()
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( cors( corsOptions ) );

connectDB()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Its elance - Backend" })
})
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.get('*', function(req, res){
  res.status(404).send('Specified Route is not avaliable');
});

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`)
})
