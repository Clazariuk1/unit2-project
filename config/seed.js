// when developing, npm run seed executes this file. it deletes the database and replaces it with predetermined data. this allows time saving when dealing with large quantity testing. turns application into a sandbox. run the file between demos and interviews, start with fresh material every time.

require('dotenv').config()
require('./database')
const Course = require('../models/course')
const Instructor = require('../models/instructor')
const Pet = require('../models/pet')
const User = require('../models/user')

const seed = async () => {
    const getPetIds = () => pets.map(pet => pet._id.toString())
    const getCourseIds = () => courses.map(course => course._id.toString())

    await User.deleteMany({})
    const users = await User.create([
        {
            name: "Christine Wendt",
            email: "WhatsComingUp@gmail.com",
            password: process.env.SEED_PASSWORD,
            enrolledPets: [],
            isAdmin: false
        },
        {
            name: "Mark Kelly",
            email: "KellyConventional@gmail.com",
            password: process.env.SEED_PASSWORD,
            enrolledPets: [],
            isAdmin: false
        },
        {
            name: "John Smith",
            email: "john123@gmail.com",
            password: process.env.SEED_PASSWORD,
            enrolledPets: [],
            isAdmin: false
        },
        {
            name: "Kevin Bacon",
            email: "Baconator2@gmail.com",
            password: process.env.SEED_PASSWORD,
            enrolledPets: [],
            isAdmin: true
        }])

    await Pet.deleteMany({})
    const pets = await Pet.create([
        {
            name: "Stacy",
            breed: "Siberian Husky",
            gender: "female",
            weight: 76,
            enrolledCourses: [],
            owner: '65b57002f8a603f86311c1c2',
        },
        {
            name: "Johnny",
            breed: "Chihuahua",
            gender: "male",
            weight: 12,
            enrolledCourses: [],
            owner: '65b57002f8a603f86311c1c2',
        },
        {
            name: "Karen",
            breed: "German Shepherd",
            gender: "female",
            weight: 82,
            enrolledCourses: [],
            owner: '65b57002f8a603f86311c1c2',
        },
        {
            name: "Marcus",
            breed: "Pitbull",
            gender: "male",
            weight: 87,
            enrolledCourses: [],
            owner: '65b57002f8a603f86311c1c2',
        },
        {
            name: "Michelle",
            breed: "Schnauser",
            gender: "female",
            weight: 22,
            enrolledCourses: [],
            owner: '65b57002f8a603f86311c1c2',
        },
        {
            name: "Joey",
            breed: "Beagle",
            gender: "male",
            weight: 32,
            enrolledCourses: [],
            owner: '65b57002f8a603f86311c1c2',
        }
    ])

    await Instructor.deleteMany({})
    const instructor = await new Instructor({
        name: "Mary Blithe",
        bio: "I saw a cloud go by when I was twelve and wanted to be an astronaut. Hire me.",
        courses: [],
        testimonials: []
    })

    getPetIds()

    await Course.deleteMany({})
    const courses = await Course.create([
        {
            name: "Tricks 101",
            description: "Learning the basics.",
            petsEnrolled: pets,
            instructors: [instructor._id]
        },
        {
            name: "Obedience Training",
            description: "Helping your pet understanding commands.",
            petsEnrolled: [],
            instructors: []
        },
        {
            name: "Competition Preparation",
            description: "Train for the trophy!",
            petsEnrolled: [],
            instructors: []
        }
    ])

    instructor.courses.push(...courses)
    await instructor.save()

    const allPets = await Pet.updateMany({},
        {
        $set: {enrolledCourses: [courses[0]._id]}
        })

    process.exit()
}

seed()
