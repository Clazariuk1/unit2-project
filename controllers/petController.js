// Draft note. make the boolean value for dog gender a thing. CREATE and UPDATE are the pathways that matter. Actually, this may seem like too many steps.

// can we display multiple different entities same page? Example: User Show page and Pets Index.

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
    // if(req.body.gender === 'off') {
    //     req.body.isMale = false
    // } else {
    //     req.body.isMale = true
    // }
    try {
        const pet = await Pet.create(req.body)
        res.status(200).json(pet)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function update(req, res) {
        // if(req.body.gender === 'off') {
    //     req.body.isMale = false
    // } else {
    //     req.body.isMale = true
    // }
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
