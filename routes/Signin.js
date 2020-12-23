var express = require("express");
var router = express.Router();
const jsonwt = require("jsonwebtoken");
const User = require("../models/User");
var bcrypt = require("bcrypt");

router.post("/signin", async (req, res) => {
  var newUser = {};
  newUser.email = req.body.email;
  newUser.password = req.body.password;

  await User.findOne({ email: newUser.email })
    .then(profile => {
      if (!profile) {
        res.send("User does not exist");
      } else {
        bcrypt.compare(
          newUser.password,
          profile.password,
          async (err, result) => {
            if (err) {
              console.log("Error is", err.message);
            } else if (result === true) {
              //   res.send("User authenticated");
              const payload = {
                id: profile.id,
                email: profile.email,
              };

              // Create token
              jsonwt.sign(
                payload,
                process.env.secretTokenKey,
                { algorithm: "HS256", expiresIn: process.env.secretTokenLife },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    email: profile.email,
                    isTeacher: profile.isTeacher,
                    lastName: profile.lastName,
                  });
                }
              );
            } else {
              res.send("User Unauthorized Access");
            }
          }
        );
      }
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

module.exports = router;
