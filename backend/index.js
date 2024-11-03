const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const userRoutes = require('./routes/UserRoutes')

const app = express()
app.use(express.json())
app.use(cors())


//routes
app.use('/api/v1', userRoutes)

//mongodb
mongoose.connect(process.env.MONGODB)
const dbconfig = mongoose.connection;

dbconfig.on('connected', () => {
    console.log('mongodb connected successfully')
})

dbconfig.on('error', () => {
    console.log('mongodb not connected')
})


//server
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server start on the port ${port}`)
})

