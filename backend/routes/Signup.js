var express = require("express");
var router = express.Router();
const User = require("../models/User");
var bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  var newUser = User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    idNumber: req.body.idNumber,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    password: req.body.password,
    isTeacher: req.body.isTeacher,
  });

  await User.findOne({ email: newUser.email })
    .then(async profile => {
      if (!profile) {
        bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
          if (err) {
            console.log("Error is", err.message);
          } else {
            newUser.password = hash;
            await newUser
              .save()
              .then(() => {
                res.status(200).send(newUser);
              })
              .catch(err => {
                console.log("Error is ", err.message);
              });
          }
        });
      } else {
        res.send("email already in use");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

module.exports = router;
