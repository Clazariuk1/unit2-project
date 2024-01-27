const courseController = require('../controllers/courseController.js')
const userController = require('../controllers/userController.js')
// const petController = require('../controllers/petController.js')

const express = require('express')
const router = express.Router()



// Are we supposed to NOT create routes for situations like creating courses? In this scenario users cannot build their own courses, there are only pre-existing ones unless we make the 'user' an admin of the team. In customer scenario, only index and show should be allowed. Admin scenario, all routes possible.
// Becaus courses will be universally viewed, riddle me this - we DONT have to 'authorize' user, we only have to perform admin check on user in order to correctly view / post?
router.get('/', courseController.index)
router.post('/', userController.auth, userController.adminCheck, courseController.create)
router.put('/:id', userController.auth, userController.adminCheck, courseController.update)
router.delete('/:id', userController.auth, userController.adminCheck, courseController.destroy)
router.get('/:id', courseController.show)
router.post('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.addInstructor) // MANY TO MANY
router.delete('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.removeInstructor)
router.put('/:courseId/pets/:petId', userController.auth, courseController.petEnrollmentCheck, courseController.enrollPet ) // enroll your pet in desired course
router.delete('/:courseId/pets/:petId', userController.auth, userController.adminCheck, courseController.removePet ) // remove any pet from intended course


module.exports = router
