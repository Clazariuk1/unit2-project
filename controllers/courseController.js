const Course = require('../models/course')
const Instructor = require('../models/instructor')
const Pet = require('../models/pet')

exports.courseInstructorLimitCheck = async (req, res, next) => {
    const foundCourse = await Course.findOne({_id: req.params.courseId })
        if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId}`)
    if(foundCourse.instructorsAssigned.length >= 2) {
        res.status(403).json({ message: `This course is already at maximum assignment for instructors.`})
    }
    next()
}

exports.petEnrollmentCheck = async (req, res, next) => {
    const foundCourse = await Course.findOne({_id: req.params.courseId })
    if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId }`)
    if(foundCourse.petsEnrolled.length >= 6 ) {
        res.status(403).json({ message: `This course is already at maximum enrollment for pets; please contact admins to join waitlist.`})
    }
    next()
}

exports.index = async function (req, res) {
    try {
        const foundCourses = await Course.find({}).populate('instructors')
        res.status(200).json(foundCourses)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.show = async function show (req, res) {
    try {
        const foundCourse = await Course.findOne({_id: req.params.id }).populate('instructors')
        res.status(200).json(foundCourse)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.enrollPet = async function enrollPet(req, res) {
    try {
        const foundPet = await Pet.findOne({_id: req.params.petId })
        if(!foundPet) throw new Error(`Could not locate pet with id ${req.params.petId}`)
        const foundCourse = await Course.findOne({_id: req.params.courseId })
        // if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId }`)
        // if(foundCourse.petsEnrolled.length >= 6 ) {
        //     res.status(403).json({ message: `This course is already at maximum enrollment for pets; please contact admins to join waitlist.`})
        // } //am I correct that the foundCourse data will still be preserved during petEnrollmentCheck??
        foundCourse.petsEnrolled.push(foundPet._id)
        foundPet.enrolledCourses.push(foundCourse._id)
        await foundCourse.save()
        await foundPet.save()
        res.status(200).json({
            msg: `Successfully enrolled pet with id ${req.params.petId} into course with id ${req.params.courseId}`,
            course: foundCourse,
            pet: foundPet,
            description: "Oh noetry have some bad poetry",

        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// ONLY ADMINS PERMISSIBLE TO DO BELOW

exports.create = async function create(req, res) {
    try {
        const course = await Course.create(req.body)
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
      await Pet.updateMany({},
            {$pullAll:{enrolledCourses:[req.params.id]}}
            )

        await Instructor.updateMany({},
            {$pullAll:{courses:[req.params.id]}}
            )

        const deleted = await Course.findOneAndDelete({_id: req.params.id })

        res.status(200).json({ message: `The course with the ID of ${deleted._id} was deleted from the MongoDB database; no further action necessary`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.removeInstructor = async function removeInstructor(req, res) {
        try {
            const foundInstructor = await Instructor.findOne({_id: req.params.instructorId })
            if(!foundInstructor) throw new Error(`Could not locate instructor with id ${req.params.instructorId}`)
            const foundCourse = await Course.findOne({_id: req.params.courseId })
            if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId}`)
            foundCourse.instructorsAssigned.splice(instructorsAssigned.indexOf(foundInstructor), 1)
            foundInstructor.courses.splice(foundInstructor.courses.indexOf(foundCourse), 1)
            await foundCourse.save()
            await foundInstructor.save()
            res.status(200).json({
                msg: `Successfully removed instructor with id ${req.params.instructorId} from course with id ${req.params.courseId}`
            })
        } catch (error) {

        }
    }

exports.addInstructor = async function addInstructor(req, res) {
        try {
            const foundInstructor = await Instructor.findOne({_id: req.params.instructorId })
            if(!foundInstructor) throw new Error(`Could not locate instructor with id ${req.params.instructorId}`)
            if(foundInstructor.courses.length >= 4) throw new Error(`Instructor with id ${req.params.instructorId} is already assigned the maximum number of courses.`)

            const foundCourse = await Course.findOne({_id: req.params.courseId })
            if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId}`)
            if(foundCourse.instructorsAssigned.length >= 2) {
                res.status(403).json({ message: `This course is already at maximum assignment for instructors.`})
            }
            foundCourse.instructorsAssigned.push(foundInstructor._id)
            foundInstructor.courses.push(foundCourse._id)
            await foundCourse.save()
            await foundInstructor.save()
            res.status(200).json({
                msg: `Successfully associated instructor with id ${req.params.instructorId} with course with id ${req.params.courseId}`,
                course: foundCourse,
                instructor: foundInstructor
            })
        } catch (error) {
            res.status(400).json({msg: error.message })
        }
    }

exports.removePet = async function removePet(req, res) {
        try {
            const foundPet = await Pet.findOne({_id: req.params.petId})
            if(!foundPet) throw new Error(`Could not locate pet with id${req.params.petId}`)
            const foundCourse = await Course.findOne({_id: req.params.courseId })
            if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId}`)
            foundCourse.petsEnrolled.splice(foundCourse.petsEnrolled.indexOf(foundPet), 1)
            await foundCourse.save()
            foundPet.enrolledCourses.splice(foundPet.enrolledCourses.indexOf(foundCourse), 1)
            await foundPet.save()
            res.status(200).json({
                msg: `Successfully removed pet with id ${req.params.petId} from course with id ${req.params.courseId}`,
            })
        } catch (error) {
            res.status(400).json({msg: error.message })
        }
    }
