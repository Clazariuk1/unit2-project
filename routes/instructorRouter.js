const instructorController = require('../controllers/instructorController.js')
const userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.get('/', instructorController.index)
router.post('/', userController.auth, userController.adminCheck, instructorController.create)
router.put('/:id', userController.auth, userController.adminCheck, instructorController.update)
router.delete('/:id', userController.auth, userController.adminCheck, instructorController.destroy)
router.get('/:id', instructorController.show)
router.put('/:id', userController.auth, instructorController.submitTestimonial)

module.exports = router
