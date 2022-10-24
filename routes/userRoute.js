const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('express')
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/register',async(req,res)=>{
    try {
        const userExists = await User.findOne({email: req.body.email })
        if(userExists){
            return res.status(200).send({message:'user already exists',success:false})
        }
        const password = req.body.password

        const salt = await bcrypt.genSalt(10)

        const hashedPassword  =  await bcrypt.hash(password,salt)

        req.body.password =hashedPassword 

        const newuser = new User(req.body)

        await newuser.save()

        res.status(200).send({message: 'user created successfully',success: true})

      
    } catch (error) {   
        res.status(500).send({message :'error creating user',success: false, error }) 
        
    }

})

router.post('/login',async(req,res)=>{
    try {
        const user =await  User.findOne({email:req.body.email})
        if(!user){
            return res
            .status(200)
            .send({message:'user does not exist',success:false})
        } 
        const isMatch =await bcrypt.compare(req.body.password,user.password) 
        if(!isMatch){
            return res
            .status(200)
            .send({message:"Password is incorrect", success: false})
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn   :"1d"
            })
        
            res.status(200).send({message:'login success',success:true,data: token})
        }
    } catch (error) {

        console.log(error);
        res
        .status(500)
        .send({message:"error Logging", success:false,error})
        
    }

})

router.post('/get-user-info-by-id',authMiddleware, async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.body.userId})
        if(!user){ 
            return res
           .status(200)
           .send({message:"User does not exist",success:false})
        }else{
            res.status(200).send({success:true,data:{
                name:user.name,
                email:user.email 
            }})
        }
    } catch (error) {
        res.status(500).send({message:'error getting user info',success:false,error })
        
    }

})

module.exports = router;