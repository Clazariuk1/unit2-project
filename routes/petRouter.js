const petController = require('../controllers/petController.js')
const userController = require('../controllers/userController')

const express = require('express')
const router = express.Router()

router.get('/', petController.index)
router.post('/newPet', petController.create)
router.put('/:id', petController.update)
router.delete('/:id', petController.destroy)
router.get('/:id', petController.show)

module.exports = router
