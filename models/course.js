const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    petsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'}]
},
{
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
