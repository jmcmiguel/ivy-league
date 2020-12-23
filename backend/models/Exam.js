const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  uuid: { type: String, require: true },
  examName: { type: String, require: true },
  examDesc: { type: String, require: true },
  classCode: { type: String, require: true },
  sched: { type: Date, require: true },
  deadline: { type: Date, require: true },
  submittedExam: { type: Array, default: [] },
  isChecked: { type: Boolean, default: false },
  questions: { type: Array, default: [] },
  prof: { type: String, require: true },
});

module.exports = mongoose.model("Exam", ExamSchema);
