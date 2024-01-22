/*
course model
    name: { type: String, required: true },
    bio: { type: String, required: true },
    petsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    instructorsAssigned: [""]
*/

const Course = require('../models/course')

exports.index = async function (req, res) {
    try {
        const courses = await Course.find({})
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.create = async function create (req, res) {
    try {
        const course = course.create(req.body)
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function update(req, res) {
    try {
        const updatedCourse = await Course.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.destroy = async function destroy(req, res) {
    try {
        const deleted = await Course.findOneAndDelete({_id: req.params.id })
        res.status(200).json({ message: `The course with the ID of ${deleted._id} was deleted from the MongoDB database; no further action necessary`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.show = async function show (req, res) {
    try {
        const foundCourse = await Course.findOne({_id: req.params.id })
        res.status(200).json(foundCourse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
