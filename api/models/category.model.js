const {Schema, model} = require('mongoose')
const { stringRequired, booleanTrue, extraConfig } =require('@/lib/constant')

const Category = model('Category', new Schema({
    name: stringRequired,
    status: booleanTrue
}, extraConfig)
)

module.exports = Category