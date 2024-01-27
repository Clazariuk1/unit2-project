const Instructor = require('../models/instructor')
const Course = require('../models/course')


exports.instructorLimitCheck = async function (req, res) {
                const foundInstructor = await Instructor.findOne({_id: req.params.instructorId })
            if(!foundInstructor) throw new Error(`Could not locate instructor with id ${req.params.instructorId}`)
            if(foundInstructor.courses.length >= 3) throw new Error(`Instructor with id ${req.params.instructorId} is already assigned the maximum number of courses.`)
}

exports.index = async function (req, res) {
    try {
        const instructors = await Instructor.find({}).populate('courses')
        res.status(200).json(instructors)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.create = async function (req, res) {
        try {
            const instructor = await Instructor.create(req.body)
            res.status(200).json(instructor)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

exports.update = async function update(req, res) {
        try {
            const updatedInstructor = await Instructor.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
            res.status(200).json(updatedInstructor)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

exports.destroy = async function destroy(req, res) {
        try {
            const deleted = await Instructor.findOneAndDelete({_id: req.params.id })
            res.status(200).json({ message: `The instructor with the ID of ${deleted._id} was deleted from the MongoDB database; no further action necessary`})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

exports.show = async function show(req, res) {
    try {
        const foundInstructor = await Instructor.findOne({_id: req.params.id }).populate('courses')
        res.status(200).json(foundInstructor)
    } catch (error){
        res.status(400).json({ message: error.message })
    }
}

exports.submitTestimonial = async function submitTestimonial(req, res) {
    try {
        const foundInstructor = await Instructor.findOne({_id: req.params.id })
         foundInstructor.testimonials.push(req.body)
           await foundInstructor.save()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
