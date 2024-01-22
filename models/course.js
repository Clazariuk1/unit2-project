// require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    petsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    instructorsAssigned: [""]
},
{
    timestamps: true
})

// courseSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 8)
//     }
//     next()
// })

// courseSchema.methods.generateAuthToken = async function() {
//     const token = jwt.sign({_id: this._id}, process.env.SECRET)
//     return token
// }

const Course = mongoose.model('course', courseSchema)

module.exports = Course
