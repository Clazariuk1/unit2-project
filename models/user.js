// require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}]
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET)
    return token
}

const User = mongoose.model('user', userSchema)

module.exports = User
