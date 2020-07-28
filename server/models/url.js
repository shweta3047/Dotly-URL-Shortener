const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    longUrl:{
        type:String
    },
    shortUrl:{
        type:String
    },
    code:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("Url",urlSchema);