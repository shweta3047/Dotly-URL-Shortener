const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const loginRoute=require("./routes/login");
const signupRoute=require("./routes/signup");
const urlShortenRoute=require("./routes/urlShorten");
const redirectUrl=require("./routes/redirectingUrl");
const historyRoute=require("./routes/history");

const PORT=process.env.PORT || 3001;
const {MONGOURI}=require('./config/keys');

mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('connected',()=>{
    console.log("Database connected");
})
mongoose.connection.on('error',(err)=>{
    console.log("error in conncting to database",err)
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(loginRoute);
app.use(signupRoute);
app.use(urlShortenRoute);
app.use(redirectUrl);
app.use(historyRoute);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
  }

app.listen(PORT,()=>{
    console.log("Server is listening!! "+PORT)
})