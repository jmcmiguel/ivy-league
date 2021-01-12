const mongoose = require("mongoose");

const ExamSubmissionSchema = mongoose.Schema({
  uuid: { type: String, require: true },
  exam_uuid: { type: String, require: true },
  idNumber: { type: String, require: true },
  classCode: { type: String, require: true },
  isChecked: { type: Boolean, require: true },
  score: { type: Number, require: true },
  answers: { type: Array, default: [] },
});

module.exports = mongoose.model("ExamSubmission", ExamSubmissionSchema);
