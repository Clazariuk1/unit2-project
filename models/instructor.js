// require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const instructorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    Testimonials: [""]
},
{
    timestamps: true
})

// userSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 8)
//     }
//     next()
// })

// userSchema.methods.generateAuthToken = async function() {
//     const token = jwt.sign({_id: this._id}, process.env.SECRET)
//     return token
// }

const Instructor = mongoose.model('instructor', instructorSchema)

module.exports = Instructor
