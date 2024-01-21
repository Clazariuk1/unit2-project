const petController = require('../controllers/petController.js')
const express = require('express')
const router = express.Router()


// Do the routes change if the index is supposed to populate on the same page as user profile?? Should I disregard that option?
router.get('/', petController.index)
router.post('/', petController.create)
router.put('/:id', petController.update)
router.delete('/:id', petController.destroy)
router.get('/:id', petController.show)

module.exports = router
