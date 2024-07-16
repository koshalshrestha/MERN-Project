const {Schema, model} = require('mongoose')
const { extraConfig, foreignConfig } =require('@/lib/constant')

const Order = model('Order', new Schema({
    userId: {
        ...foreignConfig,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['Processing','Confirmend', 'Shipping', 'Delivered', 'Cancelled'],
        default: 'Processing'
    }
}, extraConfig)
)

module.exports = Order