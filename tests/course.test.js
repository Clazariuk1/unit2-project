// ONLY AN ADMIN SHOULD BE ABLE TO ADD / EDIT / DELETE COURSES

// seed a user for testing into the database??

// must add tests to add instructors
// must add tests to remove instructors
// must add tests to add pet
// must add test to remove pet
// must add test to check admin power


const User = require('../models/user')
const Pet = require('../models/pet')
const Instructor = require('../models/instructor')
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

// user model:
// name: { type: String, required: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// enrolledPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
// isAdmin: [{ type: Boolean, required: true, defaultValue: false }]
// },

/*
course Model
    name: { type: String, required: true },
    description: { type: String, required: true },
    petsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
    instructorsAssigned: [""]
},
*/

// I don't understand what's going wrong here, I shouldn't need to create a user of any kind, admin or no, to access the index. What am I missing?
describe('Testing Course end points for RESTFUL JSON API', () => {
    // test('Display the full offering of courses available', async () => {
    //     const course = new Course({
    //         name: "List Courses",
    //         description: "I teach your dogs telekinesis."
    //     })
    //     await course.save()

    //     const response = await request(app).get('/courses/')

    //     expect(response.statusCode).toBe(200)
    //     expect(Array.isArray(response.body)).toBeTruthy()

    //     for(let i = 0; i < response.body.length; i++) {
    //         expect(response.body[i]).toHaveProperty('name')
    //         expect(response.body[i]).toHaveProperty('description')
    //     }
    // })
    // test('Create a new course', async () => {
    //     const user = new User ({ name: "Admin Test", email: "admin@email.com", password: "N3v3rM0re!", isAdmin: true })
    //     const token = await user.generateAuthToken()
    //     await user.save()

    //     const response = await request(app).post('/courses/')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({
    //         name: "New Course",
    //         description: "New Course coming soon! Check it out.",
    //     })
    //     expect(response.body.name).toEqual('New Course')
    //     expect(response.body.description).toEqual('New Course coming soon! Check it out.')
    // })
    // test('given a valid body it should update an existing course and return it', async () => {
    //     const user = new User ({ name: "Admin Test", email: "admin@email.com", password: "N3v3rM0re!", isAdmin: true })
    //     const token = await user.generateAuthToken()
    //     await user.save()
    //     const course = new Course({
    //         name: "Original Course",
    //         description: "Original Course description. Blah."
    //     })
    //     await course.save()

    //     const response = await request(app)
    //     .put(`/courses/${course._id}/`)
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({
    //         name: "Updated Course",
    //         description: "Updated Course description. Blah Blah.",
    //     })

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.name).toEqual('Updated Course')
    //     expect(response.body.description).toEqual("Updated Course description. Blah Blah.")
    // })

    // // MAJOR lingering question, how do we ensure that instructor and pet course arrays correctly have the deleted course removed from their arrays?
    // test('It should delete an existing course given a valid course id', async () => {
    //     const user = new User({ name: 'Auth User', email: 'AuthEmail@gmail.com', password: 'allofthem!', isAdmin: true })
    //     const token = await user.generateAuthToken()
    //     await user.save()

    //     const course = new Course({
    //         name: "Delete Course",
    //         description: "Delete this course.",
    //     })

    //     await course.save()
    //     const response = await request(app)
    //     .delete(`/courses/${course._id}`)
    //     .set('Authorization', `Bearer ${token}`)

    //     // we must include some additional pathways to ensure removal of course from instructor and pet arrays on completion.

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.message).toEqual(`The course with the ID of ${course._id} was deleted from the MongoDB database; no further action necessary`)
    // })
    // test('It should show an existing course given a valid course id', async () => {
    //     const course = new Course({
    //         name: 'Show Course',
    //         description: "I just like to show off my courses.",
    //     })
    //     await course.save()
    //     const response = await request(app).get(`/courses/${course._id}`)

    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.name).toEqual('Show Course')
    // })
    // test('It should correctly prevent a user that is not an admin from deleting an existing course', async () => {
    //     const course = new Course({
    //         name: "studd",
    //         description: "more stuff"
    //     })
    //     await course.save()

    //     const user = new User({
    //         name: 'unauthorized user',
    //         email: 'unauthorized@gmail.com',
    //         password: 'unauthorized1!',
    //         isAdmin: false
    //     })
    //     const token = await user.generateAuthToken()
    //     await user.save()



    //     const response = await request(app)
    //     .delete(`/courses${course._id}/`)
    //     .set('Authorization', `Bearer ${token}`)

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
    //     const token = await user.generateAuthToken()
    //     await user.save()
    //     const pet = new Pet({
    //         name: 'Add Vera',
    //         breed: 'Aussie-Retriever',
    //         gender: 'male',
    //         weight: 20,
    //         owner: user._id
    //     })
    //     await pet.save()

    //     const course = new Course({
    //         name: "Add Pet",
    //         description: "Add a pet to this course.",
    //         // petsEnrolled: [],
    //         // instructorsAssigned: []
    //     })
    //     await course.save()
    //     const response = await request(app).put(`/courses/${course._id}/pets/${pet._id}/`)
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({
    //         course: {
    //             name: "Add Pet",
    //         description: "Add a pet to this course.",
    //         petsEnrolled: [pet._id],
    //         },
    //         pet: {
    //             name: 'Add Vera',
    //             breed: 'Aussie-Retriever',
    //             gender: 'male',
    //             weight: 20,
    //             enrolledCourses: [course._id],
    //             owner: user._id
    //         }
    //     })

        // TRY IF THERES TIME AT THE END TO SEPARATE PETS AND COURSE TESTING STUFF....

        // name: { type: String, required: true },
        // breed: { type: String, required: true },
        // gender: { type: String, required: true, enum: ["male", "female"] },
        // weight: { type: Number, required: true },
        // enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
        // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
        // expect(response.statusCode).toBe(200)
        // expect(response.body.course.petsEnrolled.length).toEqual(1)
        // expect(response.body.pet.enrolledCourses.length).toEqual(1) // we shouldn't check if pet array is correct here. different test. you must find specific course id and ensure pet is therein enrolled. PET test not course test. SHORTCUT:..
    //})
    test('It should correctly remove a pet from the course AND UPDATE THE PETS ENROLLEDCOURSES ARRAY given an administrative user', async () => {

    })
    // test('It should correctly prevent a user from adding a pet to a fully booked course (six pets max)', async () => {

    // })
    // // test('it should correctly assign an instructor to the course AND UPDATE THE INSTRUCTORS COURSES ARRAY given an administrative user', async () => {

    // // })
    // // test('It should correctly remove an instructor from the course AND UPDATE THE INSTRUCTORS COURSES ARRAY given an administrative user', async () => {

    // // })
    // // test('It should correctly prevent assigning more instructors than max (2) to a course given an administrative user', async () => {

    // // })
})
