// require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    weight: { type: Number, required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
},
{
    timestamps: true
})

// petSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 8)
//     }
//     next()
// })

// petSchema.methods.generateAuthToken = async function() {
//     const token = jwt.sign({_id: this._id}, process.env.SECRET)
//     return token
// }

const Pet = mongoose.model('pet', petSchema)

module.exports = Pet
