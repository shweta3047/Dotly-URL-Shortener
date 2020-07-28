const express=require('express');
const router=express.Router();
const User=require('../models/user');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

router.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please add all fields"})
    }
    else{
        User.findOne({email:email})
        .then(savedUser=>{
            if(savedUser){
                return res.status(422).json({error:"User already exists!"})
            }
            bcrypt.hash(password,10)
            .then(hashedPass=>{
                const user=new User({
                    email:email,
                    password:hashedPass
                })
                user.save()
                .then(user=>{
                    return res.json({message:"User details saved successfully!"})
                })
                .catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })
    }
})

module.exports=router;