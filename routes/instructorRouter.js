const instructorController = require('../controllers/instructorController.js')
const express = require('express')
const router = express.Router()


// Are we supposed to NOT create routes for situations like creating instructors? In this scenario users cannot add their own instructors, there are only pre-existing ones unless we make the 'user' an admin of the team. In customer scenario, only index and show should be allowed. Admin scenario, all routes possible.
router.get('/', instructorController.index)
router.post('/', instructorController.create)
router.put('/:id', instructorController.update)
router.delete('/:id', instructorController.destroy)
router.get('/:id', instructorController.show)

module.exports = router
