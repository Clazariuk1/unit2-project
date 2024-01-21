require('dotenv').config()
const app = require('./app')
const PORT = process.env.PORT || 3000

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('MongoDB is LIVE.'))

app.listen(PORT, () => {
    console.log(`Port ${PORT} is live, baby.`)
})
