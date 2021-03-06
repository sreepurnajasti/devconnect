const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../../config/passport")(passport);

//database - user model
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//validation
const profileValidation = require("../../validation/profile");
const educationValidation = require("../../validation/education");
const experienceValidation = require("../../validation/experience");

//path
const path = require("path");
//multer configuaration
const multer = require("multer");
const maxSize = 1 * 1000 * 1000;
// const storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, path.join(__dirname, "../../images"));
//   },
//   filename: function(req, file, callback) {
//     console.log("file :" + JSON.stringify(file));
//     callback(null, file.originalname);
//   }
// });
// var upload = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
//   fileFilter: function(req, file, callback) {
//     var mimeTypeList = ["image/png", "image/jpeg"];
//     if (mimeTypeList.indexOf(file.mimetype) <= -1) {
//       var cusError = new Error("File type is invalid");
//       cusError.code = "INVALID_FILE_TYPE";
//       return callback(cusError);
//     } else {
//       return callback(null, true);
//     }
//   }
// }).single("avatar");

/* @route GET api/profile/test
   @desc Test the profile route
   @access public
*/
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

/* @route GET api/profile
   @desc get current users profile
   @access private
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile to display";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

/* @route GET api/handle/:handle
   @desc Get profile by handle
   @access Public
*/
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ "company.handle": req.params.handle })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        noprofile: "There is no profile for this user"
      })
    );
});
router.get("/skills/:skills", (req, res) => {
  const errors = {};
  let skill = req.params.skills.toLowerCase().split(",");
  skill = skill.map(function(s) {
    return s.trim();
  });
  console.log("came here");
  console.log("skills:" + skill);

  if (skill.length > 0) {
    Profile.find({ skills: { $all: skill } })
      .populate("user", ["name", "email"])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = "There are no profiles to display";
          res.status(404).json(errors);
        }
        console.log("success state");

        res.json(profiles);
      })
      .catch(err =>
        res.status(404).json({
          profile: "There are no profiles to display"
        })
      );
  } else {
    errors.search = "please enter a valid search";
    return res.status(400).json(errors);
  }
});
/* @route GET api/user/:user_id
   @desc Get profile by user
   @access Public
*/
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        noprofile: "There is no profile for this user"
      })
    );
});

/* @route GET api/profile/all
   @desc Get all user profiles
   @access Public
*/
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "email"])
    .sort({ "company.empNo": 1 })
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles to display";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({
        profile: "There are no profiles to display"
      })
    );
});

/* @route POST api/profile
   @desc create/ edit current users profile
   @access private
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    const { errors, isValid } = profileValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //constructing object to upload
    profileFields.user = req.user.id;
    //company Info
    profileFields.company = {};
    if (req.body.empNo) profileFields.company.empNo = req.body.empNo;
    if (req.body.phoneExtension)
      profileFields.company.phoneExtension = req.body.phoneExtension;
    if (req.body.department)
      profileFields.company.department = req.body.department;
    if (req.body.status) profileFields.company.status = req.body.status;
    if (req.body.shift) profileFields.company.shift = req.body.shift;
    if (req.body.mentor) profileFields.company.mentor = req.body.mentor;
    if (req.body.handle) profileFields.company.handle = req.body.handle;
    //Personal Info
    profileFields.personal = {};
    if (req.body.gender) profileFields.personal.gender = req.body.gender;
    if (req.body.dob) profileFields.personal.dob = new Date(req.body.dob);
    if (req.body.phone) profileFields.personal.phone = req.body.phone;
    if (req.body.address) profileFields.personal.address = req.body.address;
    if (req.body.emergencyNo)
      profileFields.personal.emergencyNo = req.body.emergencyNo;
    if (req.body.bloodGroup)
      profileFields.personal.bloodGroup = req.body.bloodGroup;
    if (req.body.bio) profileFields.personal.bio = req.body.bio;
    if (req.body.website) profileFields.personal.website = req.body.website;
    if (req.body.githubusername)
      profileFields.personal.githubusername = req.body.githubusername;
    //Skills
    if (typeof req.body.skills != "undefined") {
      profileFields.skills = req.body.skills.toLowerCase().split(",");

      profileFields.skills = profileFields.skills.map(function(s) {
        return s.trim();
      });
    }
    //Social Media Links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.quora) profileFields.social.quora = req.body.quora;
    if (req.body.medium) profileFields.social.medium = req.body.medium;
    if (req.body.stackoverflow)
      profileFields.social.stackoverflow = req.body.stackoverflow;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
          .then(profile => {
            // console.log("came here:" + profile);
            res.json(profile);
          })
          .catch(err => console.log(err));
      } else {
        //create
        //check if handle exists
        Profile.findOne({ "company.handle": profileFields.company.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "This handle already exists";
              res.status(400).json(errors);
            }
            Profile.findOne({
              "company.empNo": profileFields.company.empNo
            }).then(profile => {
              if (profile) {
                errors.empNo =
                  "This empNo already exists. Please contact the support team";
                res.status(400).json(errors);
              }
              //save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.log(err));
            });
          })
          .catch(err => console.log(err));
      }
    });
  }
);

// router.post(
//   "/upload-avatar",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     let errors = {};
//     let profileFields = {};
//     upload(req, res, function(err) {
//       if (err) {
//         switch (err.code) {
//           case "LIMIT_UNEXPECTED_FILE":
//             errors.avatar = "cannot upload more than one file";
//             return res.status(400).json(errors);

//           case "LIMIT_FILE_SIZE":
//             errors.avatar = "file size is greater than 1mb";
//             return res.status(400).json(errors);

//           case "INVALID_FILE_TYPE":
//             errors.avatar = "file must be of type jpeg or png";
//             return res.status(400).json(errors);
//         }
//       }
//       if (req.file) {
//         console.log(req.file);
//         profileFields.avatar = req.file.path;
//       }
//       Profile.findOne({ user: req.user.id })
//         .then(profile => {
//           if (profile) {
//             //update
//             Profile.findOneAndUpdate(
//               { user: req.user.id },
//               { $set: profileFields },
//               { new: true }
//             )
//               .then(profile => {
//                 // console.log("came here:" + profile);
//                 return res.json(profile);
//               })
//               .catch(err => console.log(err));
//           } else {
//             new Profile(profileFields)
//               .save()
//               .then(profile => res.json(profile))
//               .catch(err => console.log(err));
//           }
//         })
//         .catch(err => console.log(err));
//     });
//   }
// );

/* @route POST api/profile/experience
   @desc add experiences to profile
   @access private
*/
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = experienceValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (new Date(req.body.from) > new Date()) {
      errors.from = "From date should be on or before current date";
      return res.status(404).json(errors);
    }
    if (req.body.to.length > 0) {
      if (new Date(req.body.to) < new Date(req.body.from)) {
        errors.to = "To date cannot be before From date";
        return res.status(404).json(errors);
      }
    } else {
      if (!req.body.current) {
        errors.to = "Select a To date or check the box";
        return res.status(404).json(errors);
      }
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title.toLowerCase(),
        company: req.body.company.toLowerCase(),
        from: req.body.from,
        location: req.body.location.toLowerCase(),
        description: req.body.description,
        to: req.body.to,
        current: req.body.current
      };
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

/* @route POST api/profile/education
   @desc add education to profile
   @access private
*/
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = educationValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    if (new Date(req.body.from) > new Date()) {
      errors.from = "From date should be on or before current date";
      return res.status(404).json(errors);
    }
    if (req.body.to.length > 0) {
      if (new Date(req.body.to) < new Date(req.body.from)) {
        errors.to = "To date cannot be before From date";
        return res.status(404).json(errors);
      }
    } else {
      if (!req.body.current) {
        errors.to = "Select a To date or check the box";
        return res.status(404).json(errors);
      }
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school.toLowerCase(),
        degree: req.body.degree.toLowerCase(),
        from: req.body.from,
        specialization: req.body.specialization.toLowerCase(),
        location: req.body.location.toLowerCase(),
        description: req.body.description,
        to: req.body.to,
        current: req.body.current
      };
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

/* @route DELETE api/profile/experience/expid
   @desc delete experiences to profile
   @access private
*/
router.delete(
  "/experience/:expid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.expid);
        //splice out of array
        profile.experience.splice(removeIndex, 1);
        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

/* @route DELETE api/profile/education/eduid
   @desc delete education to profile
   @access private
*/
router.delete(
  "/education/:eduid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.eduid);
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

/* @route DELETE api/profile/
   @desc delete profile and user account
   @access private
*/
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);
module.exports = router;
