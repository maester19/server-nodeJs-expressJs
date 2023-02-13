const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  listDisc: [{ type: String, ref: "Conversation", required: true }],
  description: { type: String, required: false },
  profilPic: { type: String, required: false },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
}, { _id: false });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);