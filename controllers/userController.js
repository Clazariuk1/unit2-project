require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({_id: data._id })
        if(!user) {
            throw new Error('bad credentials')
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.adminCheck = async (req, res, next) => {
    if(req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({msg: `User does not have authorization to perform this action.`})
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = new User (req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({ user, token })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user || !await bcrypt.compare(req.body.password, user.password)) {
            throw new Error('invalid Login Credentials')
        } else {
            const token = await user.generateAuthToken()
            res.json({ user, token })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.json(req.user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.json({ message: 'user deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showUser = async (req, res) => {
    try {
        const foundUser = await User.findOne({_id: req.params.id, user: req.user._id }).populate('pets')
        res.status(200).json(foundUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
