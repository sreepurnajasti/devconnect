const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // combine by id
    ref: "users" //existing model reference
  },
  avatar: {
    type: String,
    default: path.join(__dirname, "..\\images\\default.png")
  },
  company: {
    empNo: {
      type: Number,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    shift: {
      type: String
    },
    handle: {
      type: String,
      required: true,
      max: 50
    }
  },
  personal: {
    gender: {
      type: String
    },
    dob: {
      type: Date
    },
    phone: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    emergencyNo: {
      type: Number,
      required: true
    },
    bloodGroup: {
      type: String,
      required: true
    },
    bio: {
      type: String
    },
    website: {
      type: String
    },
    githubusername: {
      type: String
    }
  },
  skills: {
    type: [String],
    required: true
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      description: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      specialization: {
        type: String
      },
      location: {
        type: String
      },
      description: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    stackoverflow: {
      type: String
    },
    medium: {
      type: String
    },
    quora: {
      type: String
    }
  }
});
module.exports = Profile = mongoose.model("profile", profileSchema);
