const Pet = require('../models/pet')

exports.index = async function (req, res) {
    try {
        const pets = await Pet.find({})
        res.status(200).json(pets)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.create = async function create (req, res) {
    try {
        const pet = await Pet.create(req.body)
        res.status(200).json(pet)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function update(req, res) {
    try {
        const updatedPet = await Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(updatedPet)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.destroy = async function destroy(req, res) {
    try {
        const deleted = await Pet.findOneAndDelete({_id: req.params.id })
        res.status(200).json({ message: `The pet with the ID of ${deleted._id} was deleted from the MongoDB database; no further action necessary`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.show = async function show(req, res) {
    try {
        const foundPet = await Pet.findOne({_id: req.params.id })
        res.status(200).json(foundPet)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
