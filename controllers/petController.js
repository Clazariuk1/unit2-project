// You need an isAdmin property to determine admin privileges, an if else statement within the route controller to permit authorization. Only id for user of a given pet’s owner can be applied. Req.user has user id; if it doesn’t match id of the pet.
// 	-you can directly .findOne(id equal to pet id, user: req.user._id)

// The readme is much more important than you’d think at first. A thorough/quality readme is best for backend applications.
// you need MANY user stories. even pet store employees are still users. 'As an admin user I can...' 'As a customer user I can...'
// don't over technicalize the user stories; it's simple for stupid people's sake.
// CANT check a password update, due to encryption stuff. no tests checking passwords.
// In testing you should ONLY check arrays if it's for an end point that adds or removes the array element. you're testing:
// 'Can I add a comment to a post' --> test if the array EXISTS and test if the length of the array after update is correct per your expectations.
// must add user to all pet models
// make sure that you correctly update the models to include user data.

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


// this below code is example of how to display the CORRECT user's pets.
exports.show = async function show(req, res) {
    try {
        const foundPet = await Pet.findOne({_id: req.params.id, user: req.user._id })
        res.status(200).json(foundPet)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
