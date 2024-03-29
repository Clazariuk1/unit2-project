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

describe('Testing Course end points for RESTFUL JSON API', () => {
    test('Display the full offering of courses available', async () => {
        const course = new Course({
            name: "List Courses",
            description: "I teach your dogs telekinesis."
        })
        await course.save()

        const response = await request(app).get('/courses/')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy()

        for(let i = 0; i < response.body.length; i++) {
            expect(response.body[i]).toHaveProperty('name')
            expect(response.body[i]).toHaveProperty('description')
        }
    })
    test('Create a new course', async () => {
        const user = new User ({ name: "Admin Test", email: "admin@email.com", password: "N3v3rM0re!", isAdmin: true })
        const token = await user.generateAuthToken()
        await user.save()

        const response = await request(app).post('/courses/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "New Course",
            description: "New Course coming soon! Check it out.",
        })
        expect(response.body.name).toEqual('New Course')
        expect(response.body.description).toEqual('New Course coming soon! Check it out.')
    })
    test('given a valid body it should update an existing course and return it', async () => {
        const user = new User ({ name: "Admin Test0", email: "admin0@email.com", password: "N3v3rM0re!0", isAdmin: true })
        const token = await user.generateAuthToken()
        await user.save()
        const course = new Course({
            name: "Original Course",
            description: "Original Course description. Blah."
        })
        await course.save()

        const response = await request(app)
        .put(`/courses/${course._id}/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Updated Course",
            description: "Updated Course description. Blah Blah.",
        })

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Updated Course')
        expect(response.body.description).toEqual("Updated Course description. Blah Blah.")
    })
    test('It should delete an existing course given a valid course id', async () => {
        const user = new User({ name: 'Auth User', email: 'AuthEmail@gmail.com', password: 'allofthem!', isAdmin: true })
        const token = await user.generateAuthToken()
        await user.save()

        const course = new Course({
            name: "Delete Course",
            description: "Delete this course.",
        })

        await course.save()

        const pet = new Pet({
            name: "kelly", breed: "husky", gender: "female", weight: 44, enrolledCourses: [course._id], owner: user._id
        })
        await pet.save()
        const instructor = new Instructor({
            name: "Kill course", bio: "I exist for my courses to be removed", courses: [course._id]
        })
        await instructor.save()
        await pet.save()

        const response = await request(app)

        .delete(`/courses/${course._id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual(`The course with the ID of ${course._id} was deleted from the MongoDB database; no further action necessary`)
    })
    test('It should show an existing course given a valid course id', async () => {
        const course = new Course({
            name: 'Show Course',
            description: "I just like to show off my courses.",
        })
        await course.save()
        const response = await request(app).get(`/courses/${course._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Show Course')
    })
    test('it should correctly add a pet to the course AND UPDATE THE PETS ENROLLEDCOURSES ARRAY given an administrative user', async () => {
        const user = new User({
            name: 'authorized user',
            email: 'authorized@gmail.com',
            password: 'authorized1!',
            isAdmin: true
        })
        const token = await user.generateAuthToken()
        await user.save()
        const pet = new Pet({
            name: 'Add Vera',
            breed: 'Aussie-Retriever',
            gender: 'male',
            weight: 20,
            owner: user._id
        })
        await pet.save()

        const course = new Course({
            name: "Add Pet",
            description: "Add a pet to this course.",
        })
        await course.save()
        const response = await request(app).put(`/courses/${course._id}/pets/${pet._id}/`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            course: {
                name: "Add Pet",
            description: "Add a pet to this course.",
            petsEnrolled: [pet._id],
            },
            pet: {
                name: 'Add Vera',
                breed: 'Aussie-Retriever',
                gender: 'male',
                weight: 20,
                enrolledCourses: [course._id],
                owner: user._id
            }
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.course.petsEnrolled.length).toEqual(1)
        expect(response.body.pet.enrolledCourses.length).toEqual(1)
    })
    test('It should correctly remove a pet from the course AND UPDATE THE PETS ENROLLED COURSES ARRAY given an administrative user', async () => {
        const user = new User({
                    name: 'authorized1 user',
                    email: 'authorized1@gmail.com',
                    password: 'authorized11!',
                    isAdmin: true
                })
                const token = await user.generateAuthToken()
                await user.save()
                const pet = new Pet({
                    name: 'Remove Vera',
                    breed: 'Aussie-Retriever',
                    gender: 'female',
                    weight: 20,
                    enrolledCourses: [],
                    owner: user._id
                })

                const course = new Course({
                    name: "Remove Pet",
                    description: "Remove a pet from this course.",
                    petsEnrolled: [pet._id]
                })

                await course.save()
                await pet.save()

                const response = await request(app)
                .delete(`/courses/${course._id}/pets/${pet._id}/`)
                .set('Authorization', `Bearer ${token}`)

                expect(response.statusCode).toBe(200)
                expect(response.body.msg).toEqual(`Successfully removed pet with id ${pet._id} from course with id ${course._id}`)
        })
    test('Add instructor to course. it should correctly assign an instructor to the course AND UPDATE THE INSTRUCTORS COURSES ARRAY given an administrative user', async () => {
        const user = new User({
                name: 'Instructor User',
                email: 'InstructorMan@gmail.com',
                password: 'authorizedMan!',
                isAdmin: true
            })
            const token = await user.generateAuthToken()
            await user.save()
            const instructor = new Instructor({
                name: 'chadwick Byers',
                bio: 'I like eating dirt',
                courses: []
            })
            await instructor.save()

            const course = new Course({
                name: "Add Instructor",
                description: "Add an instructor to this course.",
                instructors: []
            })
            await course.save()
            const response = await request(app)
            .put(`/courses/${course._id}/instructors/${instructor._id}/`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                course: {
                name: "Add Instructor",
                description: "Add an instructor to this course.",
                instructors: [instructor._id],
                },
                instructor: {
                    name: 'Chadwick Byers',
                    bio: 'I like eating dirt',
                    courses: [course._id],
                }
            })
            expect(response.statusCode).toBe(200)
            expect(response.body.course.instructors.length).toEqual(1)
            expect(response.body.instructor.courses.length).toEqual(1)
    })
    test('It should correctly remove an instructor from the course AND UPDATE THE INSTRUCTORS COURSES ARRAY given an administrative user', async () => {
        const user = new User({
                            name: 'authorized11 user',
                            email: 'authorized11@gmail.com',
                            password: 'authorized111!',
                            isAdmin: true
                        })
                        const token = await user.generateAuthToken()
                        await user.save()
                        const instructor = new Instructor({
                            name: 'Remove Instructor',
                            bio: 'Delete meh!',
                            courses: [],
                        })
                        await instructor.save()

                        const course = new Course({
                            name: "Remove Instructor",
                            description: "Remove an instructor from this course.",
                            instructors: [instructor._id]
                        })

                        await course.save()
                        instructor.courses.push(course._id)
                        await instructor.save()

                        const response = await request(app)
                        .delete(`/courses/${course._id}/instructors/${instructor._id}/`)
                        .set('Authorization', `Bearer ${token}`)

                        expect(response.statusCode).toBe(200)
                        expect(response.body.msg).toEqual(`Successfully removed instructor with id ${instructor._id} from course with id ${course._id}`)
    })
})
