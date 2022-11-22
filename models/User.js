const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: false },
  country: { type: String, required: false },
  phone: { type: String, required: false },
  dateOfBorn: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);