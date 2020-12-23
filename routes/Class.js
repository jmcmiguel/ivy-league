var express = require("express");
var router = express.Router();
const Class = require("../models/Class");

router.post("/class", async (req, res) => {
  let newClass = Class({
    courseCode: req.body.courseCode,
    courseDesc: req.body.courseDesc,
    section: req.body.section,
    studentEnrolled: req.body.studentEnrolled,
    classCapacity: req.body.classCapacity,
    classCode: req.body.classCode,
    image: `${req.body.image}`,
    prof: req.body.prof,
  });

  await Class.findOne({
    courseCode: newClass.courseCode,
    section: newClass.section,
  })
    .then(async profile => {
      if (!profile) {
        await newClass
          .save()
          .then(() => {
            res.status(200).send(newClass);
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

router.get("/class", async (req, res) => {
  await Class.find({})
    .then(section => {
      res.send(section);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.delete("/class", async (req, res) => {
  await Class.deleteOne({ classCode: req.query.classCode })
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.put("/class", async (req, res) => {
  await Class.updateOne(
    { classCode: req.body.classCode },
    { $push: { studentEnrolled: req.body.email } }
  )
    .then(() => {
      res.sendStatus(200).end();
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;
