const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  classes: { type: Array, default: [] },
  idNumber: { type: String, default: [] },
});

module.exports = mongoose.model("Student", StudentSchema);
