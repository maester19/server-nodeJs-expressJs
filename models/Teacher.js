const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: false
    },
    matricule: {
        type: String,
        required: true
    },
    faculty: { 
        type: String,
        ref: 'Faculty'
    },
    courses: {
        type: [{ type: String }],
        ref: 'Course',
        default: []
    }
}, { _id: false })

module.exports = mongoose.model("Teacher", teacherSchema)