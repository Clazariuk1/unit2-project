const petController = require('../controllers/petController.js')
const userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()

// User authorization required to create / update / destroy pets. Only allow your own pets to be touched by you.
// Do the routes change if the index is supposed to populate on the same page as user profile?? Should I disregard that option?
router.get('/', petController.index)
router.post('/', userController.auth, petController.create)
router.put('/:id', userController.auth, petController.update)
router.delete('/:id', userController.auth, petController.destroy) // user need
router.get('/:id', petController.show)

module.exports = router
