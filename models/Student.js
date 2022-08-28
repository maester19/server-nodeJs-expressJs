const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  _id: { type: String },
  name: { type: String, required: true },
  surname: { type: String, required: false },
  bornDate: { type: Date, required: true, default: Date.now() },
  matricule: { type: String, required: true },
  level: { type: Number, required: true },
  faculty: { type: String, ref: 'Faculty' },
  courses: {
      type: [{ type: String }],
      ref: 'Course',
      default: []
  }
}, { _id: false });

module.exports = mongoose.model('Student', studentSchema); 