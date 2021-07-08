const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  f_name: {type: String, required: true},
  l_name: {type: String, required: true},
  user_name: {type: String, required: true},
  occupation: {type: String, required: true},
  intro: {type: String, required: true},
  profile_pic: {type: String, required: true},
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    unique: true,
  },
  phone: {type: String, required: true},
  website: {type: String, required: true},
  resume: {type: String, required: true},
}



,
{ timestamps: true }
)

module.exports = mongoose.model("user", userSchema);
