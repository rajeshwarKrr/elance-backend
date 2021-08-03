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
  // address: [{
  //   type: String, 
  // }],
  website: {
    type: String,
  },
  // resume: {
  //   type: String,
  // },
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
      degree: {
        type: String, 
        required: true, 
      },
    }
  ],
  skills: [
    {
      name: {
        type: String, 
        required: true
      }, 
    }
  ],
  portfolioProjects: [
    {
      title: String,
      // category: String,
      description: String,
      skills: [{
        type: String
      }],
      image_url: String,
      project_url: String
    }
  ],
  reviews: [
    {
      title: {
        type: String,
        required: true,
      }, 
      description: {
        type: String,
        required: true,
      },  
      rating: {
        type: Number,
        required: true,
      }, 
      reviewedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
      }
    }
  ],
  reviewed: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    }
  ],
  projects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "project"
    }
  ], 
  applications: [{
    projectId: {
      type: mongoose.Schema.ObjectId,
      ref: "project"
    }, 
    applicationId: {
      type: mongoose.Schema.ObjectId,
      ref: "application"
    },
  }], 
  hireRequests: [
    {
      projectId: {
        type: mongoose.Schema.ObjectId,
        ref: "project"
      }, 
      clientId: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
      },
      hireRequestId: {
        type: mongoose.Schema.ObjectId,
        ref: "hireRequest"
      }, 
    }
  ],
  favUsers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ], 
  favProjects: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "project"  
    }
  ],
  favByUsers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user"
    }
  ], 
  notifications: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "notification"
    }
  ], 
  provider: {
    googleId: {
      type: Number, 
    }
  },
  verificationToken: String,
},
{ timestamps: true }
)

module.exports = mongoose.model("user", userSchema);



// qualifications: [
//   {
//     // school: {
//     //   type: String, 
//     //   required: true
//     // },
//     degree: {
//       type: String, 
//       required: true, 
//     },
//     // graduated: {
//     //     type: String, 
//     //     required: true, 
//     // }, 
//     // description: {
//     //   type: String, 
//     //   required: true,
//     // }, 
//     // from: {
//     //   type: Date,
//     //   required: true,
//     // }, 
//     // to: {
//     //   type: Date,
//     //   // required: true
//     // }
//   }
// ],
  // works: [
  //   {
  //     company :{
  //       type: String, 
  //       required: true,
  //     },
  //     title: {
  //       type: String, 
  //       required: true
  //     },
  //     from: {
  //       type: String, 
  //       required: true
  //     },
  //     to: {
  //       type: String, 
  //       required: true,
  //     },
  //     description: {
  //       type: String, 
  //       required: true,
  //     }, 
  //     currentCompany: {
  //       type: Boolean, 
  //       required: true,
  //       enum: [ true, false ],
  //       default: false
  //     }
  //   }
  // ],
