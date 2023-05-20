const express=require('express');
const bodyparser = require('body-parser');
const app=express();
const dbconnection = require('./config/config');
const route = require('./router/index');
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));
const cors = require('cors');


app.use('/',route)

app.get('/',function(req,res){
    res.status(200).send(`Welcome to cataract`);
});

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});

dbconnection.getConnection((err, connection)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to mysql database")
    }
        
})


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


module.exports = dbconnection;
