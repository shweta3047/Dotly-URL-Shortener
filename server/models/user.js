const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const userSchema=new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    urls:[{
       url:{
            type:ObjectId,
            ref:"Url"
        },
        date: { type: Date, default: Date.now }
    }]
},{timestamps:true})

module.exports=mongoose.model("User",userSchema);