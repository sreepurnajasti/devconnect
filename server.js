const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

const passport = require("passport");
app.use(passport.initialize());
require("./config/passport").passport;

/* @route GET /
   @desc Test the basic route
   @access public
*/
app.get("/", (req, res) => res.send("hello!"));

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);

app.listen(port, () => `server running on port ${port}`);
