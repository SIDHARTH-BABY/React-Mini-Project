const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phonenum: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        DescribeCompany: {
            type: String,
            required: true
        },
        uniqueAboutSolution: {
            type: String,
            required: true
        },
        revenueModel:{
            type: String,
            required: true
        },
        status:{
            type: String,
            default:'pending'
         },
        slot: {
            type: mongoose.Types.ObjectId,
            ref: 'Slots'
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'Users'
        },
    },
    {
        timestamps: true
    }
)

const eventModel = mongoose.model('event', eventSchema)

module.exports = eventModel