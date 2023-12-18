const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose) //(mongoose) bracket is just documented as correct usage.

const noteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //taking a type from another schema..
            required: true,
            ref: 'User' //the schema specified.
        },
        title: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    { // is an option, a different object to above. This object lets mongoDB set for us.
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    //options object
    inc_field: 'ticket', // creates a ticket field for us in the schema.
    id: 'ticketNums', // seen in the counter collection mongo creates.
    start_seq: 500
})
// creates a collection called counter that increments counter and inserts it for us.

module.exports = mongoose.model('Note', noteSchema)