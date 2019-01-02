const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../../config/passport")(passport);

//database - user model
const User = require("../../models/User");
const Profile = require("../../model/Profile");

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
    errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile to display";
          return res.status(404).json(error);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
