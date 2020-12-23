var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req);
    res.json({
      isTeacher: req.user.isTeacher,
      idNumber: req.user.idNumber,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  }
);

module.exports = router;
