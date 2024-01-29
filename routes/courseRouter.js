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
router.post('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.courseInstructorLimitCheck, courseController.doubleBookedInstructorCheck, courseController.addInstructor)
router.delete('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.removeInstructor)
// must confirm whether put or post is accurate for enrolling pets / instructors
router.put('/:courseId/pets/:petId', userController.auth, /*courseController.petEnrollmentCheck, courseController.doubleBookedPetCheck,*/ courseController.enrollPet )
router.delete('/:courseId/pets/:petId', userController.auth, userController.adminCheck, courseController.removePet )

module.exports = router
