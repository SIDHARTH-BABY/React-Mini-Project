const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const Event = require("../models/eventModel")
const authMiddleware = require("../middlewares/authMiddleware")



router.get('/get-all-events', authMiddleware, async (req, res) => {

    try {
        const events = await Event.find({})
        res.status(200).send({ message: "Events fetched Successfully", success: true, data: events })
    } catch (error) {
        res.status(500).send({ message: 'error getting event info', success: false, error })

    }

})

router.post('/change-events-status', authMiddleware, async (req, res) => {

    try {
        const { eventId, userId, status } = req.body
        const event = await Event.findByIdAndUpdate(eventId, { status })


        const user = await User.findOne({ _id: event.userId })
        const unseenNotifications = user.unseenNotifications
        unseenNotifications.push({
            type: "new event request changed",
            message: `Your event has been ${status}`,
            onClickPath: "/notifications",
            //  data: {
            //      eventId: newEvent._id,
            //      name: newEvent.name,
            //  },
            //  onClickPath: '/admin/events'
        })

        await user.save()

        const events = await Event.find({})

        res.status(200).send({ message: "event status updated succesfully", success: true, data: events })
    } catch (error) {
        res.status(500).send({ message: 'error getting event info', success: false, error })

    }

})

module.exports = router;  