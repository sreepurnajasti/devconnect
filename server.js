const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
/* @route GET /
   @desc Test the basic route
   @access public
*/
app.get("/", (req, res) => res.send("hello!"));

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("momgodb connected"))
  .catch(err => console.log(err));

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => `server running on port ${port}`);
