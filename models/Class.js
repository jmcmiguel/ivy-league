const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema({
  courseCode: { type: String, require: true },
  courseDesc: { type: String, require: true },
  section: { type: String, require: true },
  studentEnrolled: { type: Array, default: [] },
  classCapacity: { type: Number, require: true },
  classCode: { type: String, require: true },
  image: { type: String, require: true },
  prof: { type: String, require: true },
});

module.exports = mongoose.model("Class", ClassSchema);
