var express = require("express");
var router = express.Router();
const User = require("../models/User");

router.get("/user", async (req, res) => {
  await User.find({})
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

module.exports = router;
