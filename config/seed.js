// Developer note: while terminal is open in project folder, type 'npm run seed' to reset the database to starting objects. PERMANENTLY deletes originals and makes re-start copies / predetermined data. This allows time saving when dealing with large quantity testing; it turns application into a sandbox. Run the file between demos or interviews, start with fresh material every time.

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
            name: "Zrahzdee",
            breed: "Siberian Husky",
            gender: "female",
            weight: 76,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        },
        {
            name: "Johnny",
            breed: "Chihuahua",
            gender: "male",
            weight: 12,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        },
        {
            name: "Commander Shepherd",
            breed: "German Shepherd",
            gender: "female",
            weight: 82,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        },
        {
            name: "Pitbull the rapper",
            breed: "Pitbull the dog",
            gender: "male",
            weight: 87,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        },
        {
            name: "Michelle",
            breed: "Schnauser",
            gender: "female",
            weight: 22,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        },
        {
            name: "Joey",
            breed: "Beagle",
            gender: "male",
            weight: 32,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        }
    ])

    await Instructor.deleteMany({})
    const instructor = await Instructor.create(
        {
        name: "Mary Blithe",
        bio: "I saw a cloud go by when I was twelve and wanted to be an astronaut. Hire me.",
        courses: [],
        testimonials: []
        }
    )

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
            instructors: [instructor._id]
        },
        {
            name: "Competition Preparation",
            description: "Train for the trophy!",
            petsEnrolled: [],
            instructors: [instructor._id]
        }
    ])

    const kevinBacon = await User.findOneAndUpdate({_id: users[3]._id},{
        $set: {enrolledPets: [...pets]}
    })

    instructor.courses.push(...courses)
    await instructor.save()

    const backupInstructor = await Instructor.create(
        {
            name: "Max Trainer",
            bio: "I grew up on a farm in Alaska and then decided to swim to the continental US and follow my dreams...",
            courses: [],
            testimonials: ["I can't believe it's not butter!"]
        })

        const max = await Instructor.findOneAndUpdate({_id: backupInstructor._id },
        {
            $set: {courses: [courses[0]._id]}
        })

        const courseAdd = await Course.findOneAndUpdate({_id: courses[0]._id},
            {
                $set: {instructors: [max._id, instructor._id]}
            })

    const allPets = await Pet.updateMany({},
        {
        $set: {enrolledCourses: [courses[0]._id]}
        })

        const backupPet = await Pet.create({
            name: "Inserter",
            breed: "Edge Case Testing",
            gender: "female",
            weight: 76,
            enrolledCourses: [],
            owner: users[3]._id // Kevin Bacon owner
        })

    process.exit()
}

seed()
