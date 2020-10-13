var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(`Hi Welcome to the Login and Signup API`);
});

module.exports = router;
