const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRouter')
const petRoutes = require('./routes/petRouter')
const instructorRoutes = require('./routes/instructorRouter')
const courseRoutes = require('./routes/courseRouter')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/pets', petRoutes)
app.use('/instructors', instructorRoutes)
app.use('/courses', courseRoutes)


module.exports = app
