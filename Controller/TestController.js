const express=require('express');
const session = require('express-session');
const db=require('../Database/dbConnection');


const TestGet=(req,res)=>{
    res.render('test', { username: null });    
}

module.exports={
    TestGet
}