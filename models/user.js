// Does the model have a 'defaultValue' setting?? How do we ensure default admin value is false??
//make sure dotenv active for all models.
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    // should isAdmin have defaultValue: false ???
    isAdmin: { type: Boolean, required: true }
},
{
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
