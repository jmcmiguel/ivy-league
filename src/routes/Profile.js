var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.json({
      id: req.user.id,
      email: req.user.email,
    });
  }
);

module.exports = router;
