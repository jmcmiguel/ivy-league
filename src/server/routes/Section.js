var express = require("express");
var router = express.Router();
const Class = require("../models/Section");

router.post("/sections", async (req, res) => {
  let newSection = Class({
    courseCode: req.body.courseCode,
    courseDesc: req.body.courseDesc,
    section: req.body.section,
    studentEnrolled: req.body.studentEnrolled,
    classCapacity: req.body.classCapacity,
    classCode: req.body.classCode,
    image: `${req.body.image}`,
  });

  await Class.findOne({
    subject: newSection.subject,
    section: newSection.section,
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

router.get("/sections", async (req, res) => {
  await Class.find({})
    .then(section => {
      res.send(section);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

module.exports = router;
