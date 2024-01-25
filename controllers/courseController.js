/*
course model
    name: { type: String, required: true },
    bio: { type: String, required: true },
    petsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    instructorsAssigned: [""]
*/

const Course = require('../models/course')
const Instructor = require('../models/instructor')

exports.index = async function (req, res) {
    try {
        const courses = await Course.find({}).populate('instructors')
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.create = async function create(req, res) {
    if(req.user.isAdmin === true ) {
        try {
            const course = course.create(req.body)
            res.status(200).json(course)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})
    }
}

exports.update = async function update(req, res) {
    if(req.user.isAdmin === true ) {
        try {
            const updatedCourse = await Course.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
            res.status(200).json(updatedCourse)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})
    }
}

exports.destroy = async function destroy(req, res) {
    if(req.user.isAdmin === true ) {
        try {
            const deleted = await Course.findOneAndDelete({_id: req.params.id })
            res.status(200).json({ message: `The course with the ID of ${deleted._id} was deleted from the MongoDB database; no further action necessary`})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})
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


// MUST ENSURE ONLY ADMINS PERMISSIBLE TO DO BELOW

exports.removeInstructor = async function removeInstructor(req, res) {
    if(req.user.isAdmin === true ) {
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
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})
    }
}

exports.addInstructor = async function addInstructor(req, res) {
    if(req.user.isAdmin === true ) {
        try {
            const foundInstructor = await Instructor.findOne({_id: req.params.instructorId }) // instructorId named in instructor router
            if(!foundInstructor) throw new Error(`Could not locate instructor with id ${req.params.instructorId}`)
            const foundCourse = await Course.findOne({_id: req.params.courseId }) // courseId named in course router
            if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId}`)
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
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})
    }
}

exports.removePet = async function removePet(req, res) {
    if (req.user.isAdmin === true ) {
        try {
            const foundPet = await Pet.findOne({_id: req.params.petId})
            if(!foundPet) throw new Error(`Could not locate pet with id${req.params.petId}`)
            const foundCourse = await Course.findOne({_id: req.params.courseId })
            if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId}`)
            foundCourse.petsEnrolled.splice(foundCourse.petsEnrolled.indexOf(foundPet), 1)
            await foundCourse.save()
            res.status(200).json({
                msg: `Successfully removed pet with id ${req.params.petId} from course with id ${req.params.courseId}`,
                course: foundCourse
            })
        } catch (error) {
            res.status(400).json({msg: error.message })
        }
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})

    }
}

exports.enrollPet = async function enrollPet(req, res) {
    try {
        const foundPet = await Pet.findOne({_id: req.params.id, user: req.user._id })
        if(!foundPet) throw new Error(`Could not locate pet with id ${req.params.petId}`)
        const foundCourse = await Course.findOne({_id: req.params.courseId })
        if(!foundCourse) throw new Error(`Could not locate course with id ${req.params.courseId }`)
        foundCourse.petsEnrolled.push(foundPet._id)
        foundPet.enrolledCourses.push(foundCourse._id)
        await foundCourse.save()
        await foundPet.save()
        res.status(200).json({
            msg: `Successfully enrolled pet with id ${req.params.petId} into course with id ${req.params.courseId}`,
            course: foundCourse,
            petsEnrolled: foundPet
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// router.post('/:courseId/pets/:petId', courseController.addPet )
// router.delete('/:courseId/pets/:petId', courseController.removePet )
