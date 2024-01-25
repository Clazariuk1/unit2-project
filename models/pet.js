// require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// MUST add user to pet model
// use ENUM as your choice factors. make a line in the code to push back response.tolowercase for the gender data.
// Consider changing gender from string to boolean type. Dilemma: Should this be a two input system then? The male input is off and the female input is on, and vice versa?
const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    weight: { type: Number, required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},

},
{
    timestamps: true
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet
