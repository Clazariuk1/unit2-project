// ONLY AN ADMIN SHOULD BE ABLE TO ADD / EDIT / DELETE COURSES

// seed a user for testing into the database??

// must add tests to add instructors
// must add tests to remove instructors
// must add tests to add pet
// must add test to remove pet
// must add test to check admin power


// user model:
// name: { type: String, required: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// enrolledPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
// isAdmin: [{ type: Boolean, required: true, defaultValue: false }]
// },

const User = require('../models/user')
const Pet = require('../models/pet')
// const Instructor = require('../models/instructor')
const Course = require('../models/course')
const mongoose = require('mongoose')
const app = require('../app')
const { MongoMemoryServer } = require('mongodb-memory-server')
const request = require('supertest')
const server = app.listen('8090', () => console.log('Test the Courses!'))
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
    // test('Display the full offering / schedule of courses available', async () => {
    //     const course = new Course({
    //         name: "List Course",
    //         description: "I teach your dogs telekinesis.",
    //         petsEnrolled: ["TestieOne", "TestieTwo", "TestieThree", "TestieFour", "TestieFive"],
    //         instructorsAssigned: ["Test One", "Test Two"]
    //     })
    //     await course.save()

    //     const response = await request(app).get('/courses')
    //     console.log(response)

    //     expect(response.statusCode).toBe(200)
    //     expect(Array.isArray(response.body)).toBeTruthy()

    //     for(let i = 0; i < response.body.length; i++) {
    //         expect(response.body[i].toHaveProperty('name'))
    //         expect(response.body[i].toHaveProperty('description'))
    //         expect(response.body[i].toHaveProperty('petsEnrolled'))
    //         expect(response.body[i].toHaveProperty('instructorsAssigned'))
    //     }
    //})
    // test('Create a new course', async () => {
    //     const response = await request(app).post('/courses').send({
    //         name: "New Course",
    //         description: "New Course coming soon! Check it out.",
    //         petsEnrolled: ["OneTestie", "TwoTestie", "ThreeTestie", "FourTestie", "FiveTestie" ],
    //         instructorsAssigned: ["One Test", "Two Test"]
    //     })
    //     expect(response.body.name).toEqual('New Course')
    //     expect(Array.isArray(response.body.petsEnrolled)).toBeTruthy()
    //     expect(Array.isArray(response.body.instructorsAssigned)).toBeTruthy()
    // })
    // test('given a valid body it should update an existing course and return it', async () => {
    //     const course = new Course({
    //         name: "Original Course",
    //         description: "Original Course description. Blah.",
    //         petsEnrolled: ["Origin One", "Origin Two", "Origin Three"],
    //         instructorsAssigned: ["One Origin", "Two Origin"]
    //     })
    //     await course.save()

    //     const response = (await request(app).put(`/courses/${course._id}`)).send({
    //         name: "Updated Course",
    //         description: "Updated Course description. Blah Blah.",
    //         petsEnrolled: ["Updated One", "Updated Two", "Original Three", "Updated Four"],
    //         instructorsAssigned: ["One Updated", "Two Updated"]
    //     })
    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.name).toEqual('Updated Course')
    //     // Must make sure I get better tests for the arrays on courses.
    //     expect(response.body.petsEnrolled.length).toEqual(4)
    //     expect(response.body.instructorsAssigned.length).toEqual(2)
    // })
    test('It should delete an existing course given a valid course id', async () => {
        const user = new User({ name: 'Auth User', email: 'AuthEmail@gmail.com', password: 'allofthem!', isAdmin: true })
        const token = await user.generateAuthToken()
        await user.save()

        const course = new Course({
            name: "Delete Course",
            description: "Delete this course.",
            petsEnrolled: [],
            instructorsAssigned: []
        })

        await course.save()
        const response = await request(app)
        .delete(`/courses/${course._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`The course with the ID of ${course._id} was deleted from the MongoDB database; no further action necessary`)
    })
    // test('It should show an existing course given a valid course id', async () => {
    //     const course = new Course({
    //         name: 'Show Course',
    //         description: "I just like to show off my courses.",
    //         petsEnrolled: ["Show One", "Show Two"],
    //         instructorsAssigned: ["One Show"]
    //     })
    //     await course.save()
    //     const response = await request(app).get(`/courses/${course._id}`)

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.name).toEqual('Show Course')
    //     expect(response.body.petsEnrolled.length).toEqual(2)
    //     expect(response.body.instructorsAssigned.length).toEqual(2)
    // })
    // test('It should correctly prevent a user that is not an admin from deleting an existing course', async () => {
    //     const user = new User({
    //         name: 'unauthorized user',
    //         email: 'unauthorized@gmail.com',
    //         password: 'unauthorized1!',
    //         isAdmin: false
    //     })
    //     await user.save()

    //     const course = new Course({
    //         name: "studd",
    //         description: "more stuff"
    //     })

    //     const response = await request(app).delete(`/courses${course._id}`)

    //     expect(response.statusCode).toBe(403)
    //     expect(response.message).toEqual(`User does not have authorization to perform this action.`)
    // })
    // test('it should correctly add a pet to the course AND UPDATE THE PETS ENROLLEDCOURSES ARRAY given an administrative user', async () => {
    //     const user = new User({
    //         name: 'authorized user',
    //         email: 'authorized@gmail.com',
    //         password: 'authorized1!',
    //         isAdmin: true
    //     })
    //     await user.save()
    //     const pet = new Pet({
    //         name: 'Add Vera',
    //         breed: 'Enroll',
    //         gender: 'male',
    //         weight: 20,
    //         owner: 'Your Mom'
    //     })
    //     await pet.save()

    //     const course = new Course({
    //         name: "Add Pet",
    //         description: "Add a pet to this course.",
    //         petsEnrolled: [],
    //         instructorsAssigned: []
    //     })
    //     await course.save()
    //     const response = await request(app).put(`/courses/${course._id}/pets/${pet._id}`)


    //     expect(response.statusCode).toBe(200)
    //     expect(course.petsEnrolled.length).toEqual(3)
    //     expect(pet.enrolledCourses.length).toEqual(1)
    // })
    // // test('It should correctly remove a pet from the course AND UPDATE THE PETS ENROLLEDCOURSES ARRAY given an administrative user', async () => {

    // // })
    // // test('It should correctly prevent a user from adding a pet to a fully booked course (six pets max)', async () => {

    // // })
    // // test('it should correctly assign an instructor to the course AND UPDATE THE INSTRUCTORS COURSES ARRAY given an administrative user', async () => {

    // // })
    // // test('It should correctly remove an instructor from the course AND UPDATE THE INSTRUCTORS COURSES ARRAY given an administrative user', async () => {

    // // })
    // // test('It should correctly prevent assigning more instructors than max (2) to a course given an administrative user', async () => {

    // // })
})
