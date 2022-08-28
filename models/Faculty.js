const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    _id: { 
        type: String
    },
    name: { 
        type: String, required: true
    },
    description: { 
        type: String, required: false
    },
    students: { 
        type: [{ type: String }], 
        ref: 'Student',
        default: []
    },
    teachers: { 
        type: [{ type: String }], 
        ref: 'Teacher',
        default: []
    }
}, { _id: false })

module.exports = mongoose.model("Faculty", facultySchema)