const courseController = require('../controllers/courseController.js')
const userController = require('../controllers/userController.js')
const express = require('express')
const router = express.Router()



// Are we supposed to NOT create routes for situations like creating courses? In this scenario users cannot build their own courses, there are only pre-existing ones unless we make the 'user' an admin of the team. In customer scenario, only index and show should be allowed. Admin scenario, all routes possible.
router.get('/', courseController.index)
router.post('/', userController.auth, userController.adminCheck, courseController.create)
router.put('/:id', userController.auth, userController.adminCheck, courseController.update)
router.delete('/:id', userController.auth, userController.adminCheck, courseController.destroy)
router.get('/:id', courseController.show)
// POST /movies/moviewperformer
router.post('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.addInstructor) // MANY TO MANY
router.delete('/:courseId/instructors/:instructorId', userController.auth, userController.adminCheck, courseController.removeInstructor)
router.put('/:courseId/pets/:petId', userController.auth, courseController.enrollPet )
router.delete('/:courseId/pets/:petId', userController.auth, userController.adminCheck, courseController.removePet )


module.exports = router
