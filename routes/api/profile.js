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
    const { errors, isValid } = profileValidation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    //company Info
    profileFields.company = {};
    if (req.body.empNo) profileFields.company.empNo = req.body.empNo;
    if (req.body.department)
      profileFields.company.department = req.body.department;
    if (req.body.status) profileFields.company.status = req.body.status;
    if (req.body.shift) profileFields.company.shift = req.body.shift;
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
      profileFields.skills = req.body.skills.split(",");
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
            console.log("came here:" + profile);
            res.json(profile);
          })
          .catch(err => console.log(err));
      } else {
        //create
        //check if handle exists
        Profile.findOne({ "company.handle": profileFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "This handle already exists";
              res.status(400).json(errors);
            }
            //save profile
            new Profile(profileFields)
              .save()
              .then(profile => res.json(profile))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    });
  }
);

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
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        from: req.body.from,
        location: req.body.location,
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
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        from: req.body.from,
        specialization: req.body.specialization,
        location: req.body.location,
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
