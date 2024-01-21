const courseController = require('../controllers/courseController.js')
const express = require('express')
const router = express.Router()


// Are we supposed to NOT create routes for situations like creating courses? In this scenario users cannot build their own courses, there are only pre-existing ones unless we make the 'user' an admin of the team. In customer scenario, only index and show should be allowed. Admin scenario, all routes possible.
router.get('/', courseController.index)
router.post('/', courseController.create)
router.put('/:id', courseController.update)
router.delete('/:id', courseController.destroy)
router.get('/:id', courseController.show)

module.exports = router
