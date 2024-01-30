const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8095', () => console.log('Test the Instructors!'))

const Instructor = require('../models/instructor')
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

describe('Testing Instructor end points for RESTFUL JSON API', () => {
    test('Display the full roster of instructors teaching courses', async () => {
        const instructor = new Instructor({
            name: 'Keith Oberland',
            bio: 'He likes pina coladas and walks in the rain...',
            testimonials: ["He's the greatest, would hire again.", "Can't believe he's so good!"]
        })
        await instructor.save()

        const response = await request(app).get('/instructors/')
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('name')
            expect(response.body[i]).toHaveProperty('bio')
            expect(response.body[i]).toHaveProperty('testimonials')
            expect(response.body[i]).toHaveProperty('createdAt')
        }
    })
    test('Create a new instructor', async () => {
        const user = new User({ name: 'adminNew user', email: 'adminNew@gmail.com', password: 'adminpassword!?', isAdmin: true })
        const token = await user.generateAuthToken()
        await user.save()

        const response = await request(app)
        .post('/instructors/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'New Instructor',
            bio: "Hey I'm the new instructor... so yeah, hire me.",
            testimonials: ["She's fierce!", "Slay, queen!", "Yaaas!"]
        })
        expect(response.body.name).toEqual('New Instructor')
        expect(Array.isArray(response.body.testimonials)).toBeTruthy()
        expect(response.body.testimonials.length).toEqual(3)
    })

    test('given a valid body it should update an existing instructor and return it', async () => {
        const user = new User({ name: 'adminUpdate user', email: 'adminUpdate@gmail.com', password: 'adminpassword!!', isAdmin: true })
         const token = await user.generateAuthToken()
         await user.save()
        const instructor = new Instructor({
            name: 'Original Instructor',
            bio: 'To be determined',
            testimonials: ["The best in the business!", "Outgoing and friendly", "very patient"]
        })
        await instructor.save()

        const response = await request(app).put(`/instructors/${instructor._id}/`)
        .send({
            name: 'Updated Instructor',
            bio: "Not gonna lie, guys, I'm like, a really good instructor.",
            testimonials: ["Good guy.", "Great with Cats!", "Are we actually reading these testimonials?" ]
        })
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Updated Instructor')
        expect(response.body.bio).toEqual(`Not gonna lie, guys, I'm like, a really good instructor.`)
        expect(response.body.testimonials.length).toEqual(3)
    })
    test('It should delete an existing instructor given a valid instructor id', async () => {
        const user = new User({ name: 'adminDelete user', email: 'adminDelete@gmail.com', password: '?adminpassword!!', isAdmin: true })
        const token = await user.generateAuthToken()
        await user.save()
        const instructor = new Instructor({
            name: 'Delete Instructor',
            bio: "I know I haven't been performing lately but please don't fire me, I need this job...",
            courses: [],
            testimonials: []
    })
    await instructor.save()
    const response = await request(app)
    .delete(`/instructors/${instructor._id}/`)
    .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual(`The instructor with the ID of ${instructor._id} was deleted from the MongoDB database; no further action necessary`)
    })
    test('It should show an existing instructor given a valid instructor id', async () => {
        const instructor = new Instructor({
            name: 'Show Instructor',
            bio: "I like to show off. I'm the best in the game.",
            testimonials: ["My dog won best in show because of them!", "Muffin jumps through hoops so well now!"]})
        await instructor.save()

        const response = await request(app).get(`/instructors/${instructor._id}/`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Show Instructor')
            expect(response.body.testimonials.length).toEqual(2)
    })
})
