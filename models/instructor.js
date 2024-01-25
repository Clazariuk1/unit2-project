const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const instructorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    testimonials: [ { type: String }]
},
{
    timestamps: true
})

const Instructor = mongoose.model('Instructor', instructorSchema)

module.exports = Instructor
