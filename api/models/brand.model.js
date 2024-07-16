const {Schema, model} = require('mongoose')
const { stringRequired, booleanTrue, extraConfig } = require('@/lib/constant')

const Brand = model('Brand', new Schema({
    name: stringRequired,
    status: booleanTrue
}, extraConfig)
)

module.exports = Brand