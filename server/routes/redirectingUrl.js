const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Url=require('../models/url');

router.get("/id/:code",(req,res)=>{
    Url.findOne({code:req.params.code})
    .then(url=>{
        if(!url){
            return res.status(400).json({message:"The short url doesn't exists"});
        }
        else{
           return res.redirect(url.longUrl);
        }
    }).catch(err=>{
        console.log(err);
        return res.status(500).json("Internal server error " + err.message);
    })
})

module.exports=router;