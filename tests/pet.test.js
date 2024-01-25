/*

pet model:
    name: { type: String, required: true },
    Breed: { type: String, required: true },
    Gender: { type: String, required: true },
    Weight: { type: Number, required: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]

user model:

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    isAdmin: [{ type: Boolean, required: true, defaultValue: false }]
},

*/

const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8085', () => console.log('Test the Pets!'))

const Pet = require('../models/pet')
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})
// I feel like my routes are currently incorrect and need to be rectified. Am I supposed to make a mock user like I'm doing below or no?
describe('Testing Pet end points for RESTFUL JSON API', () => {
    test('Display a given users index of their enrolled pets', async () => {
        // const user = new User({name: 'Pet User', email: 'pet.email@gmail.com', password: 'IhateThis2', enrolledPets: [], isAdmin: false })
        const pet = new Pet({ name: 'Vera', breed: 'Aussie-Lab', gender: 'female', weight: 57, owner: "Michelle Geller" })
        await pet.save()
        // user.enrolledPets.push(pet)
        // await user.save()

        const response = await request(app).get('/pets')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('name')
            expect(response.body[i]).toHaveProperty('breed')
            expect(response.body[i]).toHaveProperty('gender')
            expect(response.body[i]).toHaveProperty('weight')
            expect(response.body[i]).toHaveProperty('owner')
            expect(response.body[i]).toHaveProperty('createdAt')
        }
    })
    test('Create a new pet', async () => {
        const response = await request(app).post('/pets').send({
            name: 'New Vera',
            breed: 'Border Collie',
            gender: 'female',
            weight: 64,
            owner: "Christopher Lazariuk"
        })

        expect(response.statusCode).toBe(200)

        expect(response.body.name).toEqual('New Vera')
        expect(response.body.breed).toEqual('Border Collie')
        expect(response.body.gender).toEqual('female')
        expect(response.body.weight).toEqual(64)
        expect(response.body.owner).toEqual('Christopher Lazariuk')
    })
    test('given a valid body it should update an existing pet and return it', async () => {
        const pet = new Pet({
            name: 'Original Vera',
            breed: 'border-aussie',
            gender: 'female',
            weight: 48,
            owner: "Mary Blithe" })
        await pet.save()

        const response = await request(app).put(`/pets/${pet._id}`).send({
            name: 'Updated Vera',
            weight: 55
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Updated Vera')
        expect(response.body.weight).toEqual(55)
    })
    test('It should delete an existing pet given a valid pet id', async () => {
        const pet = new Pet({
            name: 'Delete Vera',
            breed: 'Pitbull-Lab',
            gender: 'female',
            weight: 77,
            owner: "Mark Dixon" })
        await pet.save()

        const response = await request(app)
        .delete(`/pets/${pet._id}`)
        // .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(204)
        expect(response.body.message).toEqual(`The pet with the ID of ${pet._id} was deleted from the MongoDB database; no further action necessary`)
    })
    test('It should show an existing pet given a valid pet id', async () => {
        // const user = new User({ name: 'test user', email: 'test.user@gmail.com', password: 'yoyoMao!', enrolledPets: []})
        const pet = new Pet({
            name: 'Show Vera',
            breed: 'mini aussie',
            gender: 'female',
            weight: 43,
            owner: "Tom Sawyer" })
        await pet.save()

        const response = await request(app).get(`/pets/${pet._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Show Vera')
        expect(response.body.breed).toEqual('mini aussie')
        expect(response.body.gender).toEqual('female')
        expect(response.body.weight).toEqual(43)
    })
})
