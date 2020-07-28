const express=require('express');
const router=express.Router();
const shortid=require('shortid');
const validUrl=require('valid-url');
const mongoose=require('mongoose');
const Url=require('../models/url');
const User=require('../models/user');
const authRequired=require('../middleware/auth');
const {baseUrl}=require('../config/keys');

router.post('/shortUrl',authRequired,async(req,res)=>{
    const {longUrl}=req.body;
    if(validUrl.isUri(longUrl)){
       await Url.findOne({longUrl})
        .then(async(newUrl)=>{
            if(newUrl){
                    await User.findByIdAndUpdate(req.user._id,{$push:{urls:{url:newUrl._id,date:Date.now()}}},{new:true}).populate({path:'urls',populate:{path:'url'}})
                .exec((err,updatedUser)=>{
                    if(err){
                        return res.status(422).json({error:err})
                    }
                    else{
                        return res.json({newUrl,updatedUser})
                    }
                })
            }
            else{
                const code=shortid.generate();
                const shortUrl=baseUrl+'/id/'+code;
                const url=new Url({
                    longUrl,
                    shortUrl,
                    code
                })
                url.save()
                .then(async(newUrl)=>{
                    await User.findByIdAndUpdate(req.user._id,{$push:{urls:{url:newUrl._id,date:Date.now()}}},{new:true}).populate({path:'urls',populate:{path:'url'}})
                    .exec((err,updatedUser)=>{
                        if(err){
                            return res.status(422).json({error:err})
                        }
                        else{
                            return res.json({newUrl,updatedUser})
                        }
                    })
    
                }).catch(err=>{
                    console.log(err);
                    return res.status(500).json("Internal server error " + err.message);
                })
            }
        }).catch(err=>{
            console.log(err);
            return res.status(500).json("Internal server error " + err.message);
        })
    }
    else{
        res.status(400).json("Invalid Url! Please enter a valid url.");
    }
})

module.exports=router;