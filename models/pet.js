const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// use ENUM as your choice factors. make a line in the code to push back response.tolowercase for the gender data.
const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    weight: { type: Number, required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
},
{
    timestamps: true
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
