// Is there a way that we can prevent an instructor from taking on more than three courses and six dogs per course? Bonus round that one if able. --> add if then statement to route. if array.length < 3 do stuff, else res.status message.

// We should only be able to delete, create, or update an instructor if we have admin privileges...

// how do we permit authorization token usage again when applying to routes not on user list?

// if length is six, dont allow more. That's all you need for the add instructor. if length of instructors in course is already max, return message reached max. Get proper syntax on investigation. Google search all the different 200 responses and see which one fits best for your response. 'logically you can think like the user tried to add an instructor when they couldn't. send 403 forbidden response. OR. the 200 ish 'we would but we couldn't. just be clear in message that operation not performed.

// must create user variables with admin powers in course / instructor tests.
// must create user variable WITHOUT admin powers in course / instructor tests to evaluate admin restrictions.
//

const Instructor = require('../models/instructor')
const Course = require('../models/course')

exports.index = async function (req, res) {
    try {
        const instructors = await Instructor.find({}).populate('courses')
        res.status(200).json(instructors)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.create = async function create (req, res) {
    if(req.user.isAdmin === true ) {
        try {
            const instructor = instructor.create(req.body)
            res.status(200).json(instructor)
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
            const updatedInstructor = await Instructor.findOneAndUpdate({_id: req.params.id }, req.body, { new: true })
            res.status(200).json(updatedInstructor)
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
            const deleted = await Instructor.findOneAndDelete({_id: req.params.id })
            res.status(200).json({ message: `The instructor with the ID of ${deleted._id} was deleted from the MongoDB database; no further action necessary`})
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(403).json({ message: `User does not have authorization to perform this action.`})
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
