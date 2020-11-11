const mongoose = require("mongoose");

const ExamReportSchema = mongoose.Schema({
  uuid: { type: String, require: true },
  scores: { type: Array, default: [] },
  questionStatistics: { type: Array, default: [] },
});

module.exports = mongoose.model("ExamReport", ExamReportSchema);
