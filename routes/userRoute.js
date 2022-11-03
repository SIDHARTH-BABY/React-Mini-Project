const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const Event = require("../models/eventModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('express')
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(200).send({ message: 'user already exists', success: false })
        }
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)

        req.body.password = hashedPassword

        const newuser = new User(req.body)

        await newuser.save()

        res.status(200).send({ message: 'user created successfully', success: true })


    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'error creating user', success: false, error })

    }

})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res
                .status(200)
                .send({ message: 'user does not exist', success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Password is incorrect", success: false })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })

            res.status(200).send({ message: 'login success', success: true, data: token })
        }
    } catch (error) {

        console.log(error);
        res
            .status(500)
            .send({ message: "error Logging", success: false, error })

    }

})

router.get('/get-user-info-by-id', authMiddleware, async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.body.userId })
        if (!user) {
            return res
                .status(200)
                .send({ message: "User does not exist", success: false })
        } else {
            res.status(200).send({
                success: true, data: {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    unSeenNot: user.unseenNotifications
                }
            })
        }
    } catch (error) {
        res.status(500).send({ message: 'error getting user info', success: false, error })

    }

})

router.post('/apply-event', authMiddleware, async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body, status: 'pending' })
        await newEvent.save()
        const adminUser = await User.findOne({ isAdmin: true })

        const unseenNotifications = adminUser.unseenNotifications
        unseenNotifications.push({
            type: "new event request",
            message: `${newEvent.name} has applied for an Event`,
            data: {
                eventId: newEvent._id,
                name: newEvent.name,
            },
            onClickPath: '/admin/events'
        })
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications })
        res.status(200).send({
            success: true,
            message: "successfully applied for event",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'error while applying event', success: false, error })

    }

})


router.post('/mark-all-notifications-as-seen', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        const unseenNotifications = user.unseenNotifications
        user.seenNotifications = unseenNotifications
        user.unseenNotifications = []
        const updatedUser = await user.findByIdAndUpdate(user._id, user)
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'all notifications are marked as seen',
            data: updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'err or while applying event', success: false, error })

    }

})


router.post("/get-one-apps", authMiddleware, async (req, res) => {
    try {
      const userId = req.body.userId
      const applications = await Event.find({ userId }).populate('slot').exec()
      res.status(200).send({ message: "application data fetched successfully", success: true, data: applications })
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Error getting user info", success: false, error })
    }
  });



module.exports = router;