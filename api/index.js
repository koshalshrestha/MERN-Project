require('module-alias/register')

const express = require('express')
const {config} = require('dotenv')
const mongoose = require('mongoose')
const {User, Brand, Category} = require('./models')
// const User = require('./models/user.model.js')
// const Brand = require('./models/brand.model.js')
// const Category = require('./models/category.model.js')
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

//     const users = await User.find()
//     console.log(users)

//     const brands = await Brand.find()
//     console.log(brands)

//     const category = await Category.find()
//     console.log(category)
})
