const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ["Employee"]
    }, // roles is an array so can have multiple roles. Will default give employee. 
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)