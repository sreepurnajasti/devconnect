const keys = require("../../config/keys");

const express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../../config/passport")(passport);

//Register validation
const registerValidation = require("../../validation/register");
//login validation
const loginValidation = require("../../validation/login");

//database - user model
const User = require("../../models/User");

/* @route GET api/users/test
   @desc Test the users route
   @access public
*/
router.get("/test", (req, res) => res.json({ msg: "users works" }));

/* @route POST api/users/register
   @desc register user/ returning user object
   @access Public
*/
router.post("/register", (req, res) => {
  //check basic validation
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

/* @route POST api/users/login
   @desc login user/ returning jwt token
   @access Public
*/
router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidation(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User email not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      //isMatch is true, password is correct
      if (isMatch) {
        //TODO: Activation link here
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.log(JSON.stringify(err));
            }
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/* @route GET api/users/current
   @desc Return current user
   @access Private
*/

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //entire user is present in req.user
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);

module.exports = router;
