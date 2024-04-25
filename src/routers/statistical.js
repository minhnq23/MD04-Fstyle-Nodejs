const express = require('express')
const routers = express.Router();

routers.get("/statistical",(req,res)=>{
    res.render('statistical')
})
module.exports= routers