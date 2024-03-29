const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    weight: { type: Number, required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps: true
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
