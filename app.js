const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRouter')
// const petRoutes = require('./routes/petRouter')
// const courseRoutes = require('./routes/courseRouter')
// const instructorRoutes = require('./routes/instructorRouter')

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
// app.use('/pets', petRoutes)
// app.use('/courses', coursRoutes)
// app.use('/instructors', instructorRoutes)

module.exports = app
