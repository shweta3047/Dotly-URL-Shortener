const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const User=require('../models/user');
const {JWT_SECRET}=require('../config/keys');

module.exports=(req,res,next)=>{
    const {Authorization}=req.headers;
    if(!Authorization){
        return res.status(401).json({error:"User must be logged in dude"});
    }
    const token=Authorization.replace('Bearer ',"")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        return res.status(401).json({error:"User must  be logged in"});
        const {_id}=payload;
        User.findById(_id).then(userData=>{
            req.user=userData;
            next()
        })
        
    })  
}