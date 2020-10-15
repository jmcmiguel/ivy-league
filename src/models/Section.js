var mongoose = require("mongoose");
const SectionSchema = mongoose.Schema({
  subject: { type: String, require: true },
  section: { type: String, require: true },
  students: { type: Number, require: false },
  description: { type: String, require: true },
  classCode: { type: String, require: true },
});
module.exports = mongoose.model("Section", SectionSchema);
