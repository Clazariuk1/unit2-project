const instructorController = require('../controllers/instructorController.js')
const userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()


// Are we supposed to NOT create routes for situations like creating instructors? In this scenario users cannot add their own instructors, there are only pre-existing ones unless we make the 'user' an admin of the team. In customer scenario, only index and show should be allowed. Admin scenario, all routes possible.
router.get('/', instructorController.index)
router.post('/', userController.auth, userController.adminCheck, instructorController.create)
router.put('/:id', userController.auth, userController.adminCheck, instructorController.update)
router.delete('/:id', userController.auth, userController.adminCheck, instructorController.destroy)
router.get('/:id', instructorController.show)
router.put('/:id', userController.auth, instructorController.submitTestimonial)
// router.post('/:instructorId/courses/:courseId', instructorController.addCourse) // MANY TO MANY . currently having an issue with this route. I don't think this one is necessary.


module.exports = router
