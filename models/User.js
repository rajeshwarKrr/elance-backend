const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  userName: {
    type: String, 
    required: true,
    lowercase: true,
    trim: true, 
    unique: true, 
  },
  userType: {
    type: String,
    enum : ['freelancer','client'],
    default: 'freelancer',
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    // required: true, 
  },
  profilePic: {
    type: String,
    // required: true, 
  },
  phoneNumber: {
    type: String, 
    required: true
  }, 
  address: [{
    type: String, 
  }],
  website: {
    type: String,
  },
  resume: {
    type: String,
  },
  socialProfiles: [{
    name: {
      type: String, 
      required: true, 
    }, 
    url: {
      type: String, 
      required: true, 
    }
  }],
  qualifications: [
    {
      school: {
        type: String, 
        required: true
      },
      degree: {
        type: String, 
        required: true, 
      },
      graduated: {
          type: String, 
          required: true, 
      }, 
      description: {
        type: String, 
        required: true,
      }, 
      from: {
        type: Date,
        required: true,
      }, 
      to: {
        type: Date,
        // required: true
      }
    }
  ],
  works: [
    {
      company :{
        type: String, 
        required: true,
      },
      title: {
        type: String, 
        required: true
      },
      from: {
        type: String, 
        required: true
      },
      to: {
        type: String, 
        required: true,
      },
      description: {
        type: String, 
        required: true,
      }, 
      currentCompany: {
        type: Boolean, 
        required: true,
        enum: [ true, false ],
        default: false
      }
    }
  ],
  skills: [
    {
      name: {
        type: String, 
        required: true
      }, 
      level: {
        type: String, 
        required: true
      }
    }
  ],
  portfolioProjects: [
    {
      title: String,
      category: String,
      description: String,
      image_url: String,
      project_url: String
    }
  ],
  reviews: [
    {
      title: String, 
      description: String, 
      rating: Number,
      reviewBy: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
      }
    }
  ],
  posts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "post"
    }
  ]
},
{ timestamps: true }
)

module.exports = mongoose.model("user", userSchema);
