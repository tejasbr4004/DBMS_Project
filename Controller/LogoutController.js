const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const logoutGet=(req,res)=>{
    req.session.destroy();
    res.redirect('/');
}

module.exports={
    logoutGet
}