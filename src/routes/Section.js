var express = require("express");
var router = express.Router();
const Section = require("../models/Section");

router.post("/sections", async (req, res) => {
  var newSection = Section({
    subject: req.body.subject,
    section: req.body.section,
    students: req.body.students,
    description: req.body.description,
    classCode: req.body.classCode,
  });

  await Section.findOne({
    subject: newSection.subject,
  })
    .then(async profile => {
      if (!profile) {
        await newSection
          .save()
          .then(() => {
            res.status(200).send(newSection);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("section already exists");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

module.exports = router;
