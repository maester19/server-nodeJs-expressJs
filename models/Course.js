const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    libelle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        require: true,
        default: 1
    },
    faculty: {
        type: String,
        ref: "Factulty"
    },
    teacher: {
        type: String,
        ref: 'Teacher'
    }
}, { _id: false })

module.exports = mongoose.model("Course", courseSchema)