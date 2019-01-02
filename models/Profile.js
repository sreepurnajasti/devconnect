const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // combine by id
    refs: "users" //existing model reference
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  },
  address: {
    type: String
  },
  phone: {
    type: Number
  },
  website: {
    type: String
  },
  company: {
    type: String
  },
  product: {
    type: String
  },
  shift: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
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
    }
  }
});
module.exports = Profile = mongoose.model("profile", profileSchema);
