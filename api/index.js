require('module-alias/register')

const express = require('express')
const {config} = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

config()

const port = process.env.API_PORT || 5000

const  mongo = process.env.MONGO_DB

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

app.use((error, req, res, next) => {
    if('message' in error && typeof error.message == 'string' && error.message.startsWith('ENOENT')){
        error.message = 'File not found'
    }
    res.status(error.status || 400)
    res.send({
        message: error.message || 'An unknown error occurred',
        errors: error.errors
    })
})

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`)
    console.log('Press Ctrl-C to quit.')

    await mongoose.connect(mongo)
    console.log('MongoDB connected')
})
