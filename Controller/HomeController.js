const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const HomeGet=(req,res)=>{
    console.log(req.body);
    res.render('home', { username: req.session.username });       
}


const HomePost=(req,res)=>{
    console.log(req.body);
    db.query('CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))', (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    res.render('home');     
}



module.exports={
    HomeGet,
    HomePost
}