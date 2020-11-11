const mongoose = require("mongoose");

const ClassReportSchema = mongoose.Schema({
  classCode: { type: String, require: true },
  ranking: { type: Array, default: [] },
  passing: { type: Array, default: [] },
});

module.exports = mongoose.model("ClassReport", ClassReportSchema);
