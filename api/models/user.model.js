const {Schema, model} = require('mongoose')
const { stringRequired, booleanTrue, extraConfig } = require('@/lib/constant')

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String, 
//         required: true
//     },
//     phone: {
//         type: String,
//         required: true,
//         maxLength: 15
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: String,
//         enum: ['Admin', 'Staff', 'Customer'],
//         default: 'Customer'
//     },
//     status: {
//         type: Boolean,
//         default: true
//     }
// }, {
//     timestamps: true,
//     autoIndex: true,
//     autoCreate: true
// })


const User = model('User', new Schema({
    name: stringRequired,
    email: {
        ...stringRequired,
        unique: true
    },
    password: { ...stringRequired , select: false

    },
    phone: {
        ...stringRequired,
        maxLength: [15, 'Phone number is too long. it must be less than 15 characters']
    },
    address: stringRequired,
    role: {
        type: String,
        enum: ['admin', 'staff', 'customer'],
        default: 'customer'
    },
    status: {
        type: Boolean,
        default: true
    }
}, extraConfig)
)

module.exports = User