const keys = require("../../config/keys");

const express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Register validation
const registerValidation = require("../../validation/register");

//database - user model
const User = require("../../models/User");

/* @route GET api/users/test
   @desc Test the users route
   @access public
*/
router.get("/test", (req, res) => res.json({ msg: "users works" }));

router.post("/register", (req, res) => {
  //check basic validation
  console.log(req.body);
  const { errors, isValid } = registerValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //check for email already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.password = hash;
          //TODO: Here Email verification should come
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(JSON.stringify(err)));
        });
      });
    }
  });
});

module.exports = router;
