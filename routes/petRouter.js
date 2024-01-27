const petController = require('../controllers/petController.js')
const userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.get('/', userController.auth, petController.index)
router.post('/newPet', userController.auth, petController.create)
router.put('/:id', userController.auth, petController.update)
router.delete('/:id', userController.auth, petController.destroy)
router.get('/:id', userController.auth, petController.show)

module.exports = router
