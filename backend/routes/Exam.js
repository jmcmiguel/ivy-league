var express = require("express");
var router = express.Router();
const Exam = require("../models/Exam");

router.post("/exam", async (req, res) => {
  let newExam = Exam({
    uuid: req.body.uuid,
    examName: req.body.examName,
    examDesc: req.body.examDesc,
    classCode: req.body.classCode,
    sched: req.body.sched,
    deadline: req.body.deadline,
    submittedExam: req.body.submittedExam,
    isChecked: req.body.isChecked,
    questions: req.body.questions,
    prof: req.body.prof,
  });

  await Exam.findOne({
    uuid: newExam.uuid,
  })
    .then(async profile => {
      if (!profile) {
        await newExam
          .save()
          .then(() => {
            res.status(200).send(newExam);
          })
          .catch(err => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("exam uuid already exists");
      }
    })
    .catch(err => {
      console.log("Error is", err.message);
    });
});

router.get("/exam", async (req, res) => {
  await Exam.find({})
    .then(exam => {
      res.send(exam);
    })
    .catch(err => {
      console.log("Error is ", err.message);
    });
});

router.put("/exam", async (req, res) => {
  await Exam.updateOne(
    { uuid: req.body.uuid },
    { $push: { submittedExam: req.body.examSubmission } }
  )
    .then(() => {
      res.sendStatus(200).end();
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.delete("/exam", async (req, res) => {
  await Exam.deleteMany({ classCode: req.query.classCode })
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.delete("/examm", async (req, res) => {
  await Exam.deleteOne({ uuid: req.query.uuid })
    .then(() => {
      res.sendStatus(204).end();
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;
