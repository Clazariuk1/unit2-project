require('dotenv').config()
require('./config/database')
const app = require('./app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Port ${PORT} is live, baby.`)
})
