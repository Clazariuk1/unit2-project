const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const User = require('../models/user')
const server = app.listen('8080', () => console.log('Testing the users...'))
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test suite for /users route on api', () => {
    // /users
    test('It should create a new user in the db', async () => {
        const response = await request(app).post('/users').send({
            name: 'Created User',
            email: 'createdUser@gmail.com',
            password: 'createdPassword!',
            isAdmin: true
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Created User')
        expect(response.body.user.email).toEqual('createdUser@gmail.com')
    })
    test('It should log in a user', async () => {
        const user = new User({
            name: 'Another User',
            email: 'another.user@gmail.com',
            password: 'anotherPassword!',
            isAdmin: false
        })
        await user.save()

        const response = await request(app)
        .post('/users/login')
        .send({ email: 'another.user@gmail.com', password: 'anotherPassword!'})

        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toEqual('Another User')
        expect(response.body.user.email).toEqual('another.user@gmail.com')
        expect(response.body).toHaveProperty('token')
    })
    test('It should update a user', async () => {
        const user = new User({
            name: 'Original User',
            email: 'original.user@gmail.com',
            password: 'originalPassword!',
            isAdmin: false })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Updated User',
            email: 'updated.user@gmail.com',
            password: 'updatedPassword!',
            isAdmin: false
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Updated User')
        expect(response.body.email).toEqual('updated.user@gmail.com')
    })
    test('It should delete a user', async () => {
        const user = new User({
            name: 'Delete User',
            email: 'delete.user@gmail.com',
            password: 'deletePassword!',
            isAdmin: true
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('user deleted')
    })
    test('User attempts login incorrectly', async () => {
        const user = new User({
            name: 'Correct User',
            email: 'correct.user@gmail.com',
            password: 'theRightOne!',
            isAdmin: false
        })
        await user.save()

        const token = await user.generateAuthToken()

        const response = await request(app)
        .post('/users/login')
        .send({ email: 'incorrect.user@gmail.com', password: 'incorrectPassword?'})

        expect(response.statusCode).toBe(400)
    })
})
