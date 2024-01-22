// ONLY AN ADMIN SHOULD BE ABLE TO ADD / EDIT / DELETE COURSES

const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8090', () => console.log('Test the Courses!'))

const Course = require('../models/course')
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

/*
course Model
    name: { type: String, required: true },
    description: { type: String, required: true },
    petsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    instructorsAssigned: [""]
},
*/

describe('Testing Course end points for RESTFUL JSON API', () => {
    test('Display the full offering / schedule of courses available', async () => {
        const course = new Course({
            name: "List Course",
            description: "I teach your dogs telekinesis.", petsEnrolled: ["TestieOne", "TestieTwo", "TestieThree", "TestieFour", "TestieFive"],
            instructorsAssigned: ["Test One", "Test Two"]
        })
        await course.save()

        const response = await request(app).get('/courses')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++) {
            expect(response.body[i].toHaveProperty('name'))
            expect(response.body[i].toHaveProperty('description'))
            expect(response.body[i].toHaveProperty('petsEnrolled'))
            expect(response.body[i].toHaveProperty('instructorsAssigned'))
        }
    })
    test('Create a new course', async () => {
        const response = await request(app).post('/courses').send({
            name: "New Course",
            description: "New Course coming soon! Check it out.",
            petsEnrolled: ["OneTestie", "TwoTestie", "ThreeTestie", "FourTestie", "FiveTestie" ],
            instructorsAssigned: ["One Test", "Two Test"]
        })
        expect(response.body.name).toEqual('New Course')
        expect(Array.isArray(response.body.petsEnrolled)).toBeTruthy()
        expect(Array.isArray(response.body.instructorsAssigned)).toBeTruthy()
    })
    test('given a valid body it should update an existing course and return it', async () => {
        const course = new Course({
            name: "Original Course",
            description: "Original Course description. Blah.",
            petsEnrolled: ["Origin One", "Origin Two", "Origin Three"],
            instructorsAssigned: ["One Origin", "Two Origin"]
        })
        await course.save()

        const response = (await request(app).put(`/courses/${course._id}`)).send({
            name: "Updated Course",
            description: "Updated Course description. Blah Blah.",
            petsEnrolled: ["Updated One", "Updated Two", "Original Three", "Updated Four"],
            instructorsAssigned: ["One Updated", "Two Updated"]
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Updated Course')
        // Must make sure I get better tests for the arrays on courses.
        expect(response.body.petsEnrolled.length).toEqual(4)
        expect(response.body.instructorsAssigned.length).toEqual(2)
    })
    test('It should delete an existing course given a valid course id', async () => {
        const course = new Course({
            name: "Delete Course",
            descrption: "Delete this course.",
            petsEnrolled: ["Delete One", "Delete Two", "Delete Three" ],
            instructorsAssigned: ["One Delete", "Two Delete"]
        })
        await course.save()
        const response = await request(app).delete(`/courses/${course._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`The course with the ID of ${course._id} was deleted from the MongoDB database; no further action necessary`)
    })
    test('It should show an existing course given a valid course id', async () => {
        const course = new Course({
            name: 'Show Course',
            description: "I just like to show off my courses.",
            petsEnrolled: ["Show One", "Show Two"],
            instructorsAssigned: ["One Show"]
        })
        await course.save()
        const response = await request(app).get(`/courses/${course._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Show Course')
        expect(response.body.petsEnrolled.length).toEqual(2)
        expect(response.body.instructorsAssigned.length).toEqual(2)
    })
})
