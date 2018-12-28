const express = require("express");
var router = express.Router();

/* @route GET api/users/test
   @desc Test the users route
   @access public
*/
router.get("/test", (req, res) => res.json({ msg: "users works" }));

module.exports = router;
