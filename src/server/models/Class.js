var mongoose = require("mongoose");
const SectionSchema = mongoose.Schema({
  courseCode: { type: String, require: true },
  courseDesc: { type: String, require: true },
  section: { type: String, require: true },
  studentEnrolled: { type: Number, default: 0 },
  classCapacity: { type: Number, require: true },
  classCode: { type: String, require: true },
  image: { type: String, require: true },
  prof: { type: String, require: false, default: "Prof. Dumbledore" },
});
module.exports = mongoose.model("Class", SectionSchema);
