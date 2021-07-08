const mongoose = require("mongoose")

const connectDB = async () => {
  const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("mongo connected");
      let db = mongoose.connection;
      db.on('error', () => {
          console.error("Error while connecting to DB");
      });
      db.on("open", () => {
        console.log("MongoDB Connected")
      })
}

module.exports = { connectDB }
