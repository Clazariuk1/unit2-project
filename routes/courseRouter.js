const courseController = require('../controllers/courseController.js')
const userController = require('../controllers/userController.js')
const instructorController = require('../controllers/instructorController.js')
const petController = require('../controllers/petController.js')

const express = require('express')
const router = express.Router()

router.get('/', courseController.index)
router.post('/', userController.auth, userController.adminCheck, courseController.create)
router.put('/:id', userController.auth, userController.adminCheck, courseController.update)
router.delete('/:id', userController.auth, userController.adminCheck, courseController.destroy)
router.get('/:id', courseController.show)
router.post('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck,/* courseController.courseInstructorLimitCheck, instructorController.instructorLimitCheck, */ courseController.addInstructor) // MANY TO MANY
router.delete('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.removeInstructor)
router.put('/:courseId/pets/:petId', userController.auth, courseController.petEnrollmentCheck, courseController.enrollPet ) // enroll your pet in desired course
router.delete('/:courseId/pets/:petId', userController.auth, userController.adminCheck, courseController.removePet ) // remove any pet from intended course


module.exports = router
