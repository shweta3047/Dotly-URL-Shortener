const express=require('express');
const router=express.Router();
const User=require('../models/user');
const mongoose=require('mongoose');
const requireAuth=require('../middleware/auth');

router.get("/history",requireAuth,(req,res)=>{
    User.findById(req.user._id).populate({path:'urls',populate:{path:'url'}}).select("-password")
    .then(savedUrls=>{
        console.log(savedUrls)
        res.json(savedUrls)
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router;