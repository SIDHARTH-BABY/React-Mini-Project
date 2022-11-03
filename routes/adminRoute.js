const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const Event = require("../models/eventModel")
const authMiddleware = require("../middlewares/authMiddleware")
const Slot = require('../models/slotModel')




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

router.post("/slot", async (req, res) => {
    try {
      const addSlot = new Slot(req.body)
      await addSlot.save()
     
      res.status(200).send({ message: "Slot added successfully", success: true })
    } catch (error) {
      res.status(500).send({ message: "Error getting slot adding process", success: false, error })
      console.log(error);
    }
  });

  router.get("/getslot", async (req, res) => {
    try {
      const slotlist =  await Slot.find({})
      res.status(200).send({ message: "fetch slot successfully", success: true, data:slotlist })
    } catch (error) {
      res.status(500).send({ message: "Error fetching slots", success: false, error })
      console.log(error);
    }
  });


  router.get("/getapps", async (req, res) => {
    try {
      const apps =  await Event.find({status: 'approved', slot:null})
      res.status(200).send({ message: "fetch applications successfully", success: true, data:apps })
    } catch (error) {
      res.status(500).send({ message: "Error fetching applications", success: false, error })
      console.log(error);
    }
  });

  router.post("/slotbook", async (req, res) => {
    try {
      const appId = req.body.appId
      const slotId = req.body.slotId
      console.log(appId);
      console.log(slotId);
      const apps = await Event.findByIdAndUpdate(appId,{
        slot :slotId
      })
      await apps.save()
      const slot= await Slot.findByIdAndUpdate(slotId,{
        status :'Booked'
      })
  
      res.status(200).send({ message: "Slot Booking successfully", success: true })
    } catch (error) {
      res.status(500).send({ message: "Error getting slot Booking process", success: false, error })
      console.log(error);
    }
  });



module.exports = router;  