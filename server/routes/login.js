const express=require('express');
const router=express.Router();
const User=require('../models/user');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/keys');

router.post("/login",(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Incorrect email or password!"})
        }
        else{
            bcrypt.compare(password,savedUser.password)
            .then(passMatch=>{
                if(!passMatch){
                    return res.status(422).json({error:"Incorrect email or password!"})
                }
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name}=savedUser;
                return res.json({token,user:{_id,name},message:"Succesfully logged in!"})
            }).catch(err=>{
                console.log(err)
            }).catch(err=>{
                console.log(err)
            })
        }
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router;