const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const RegisterGet=(req,res)=>{
    res.render('register', { username: req.session.username });  
}

const RegisterPost=(req,res)=>{
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let is_admin = req.body.is_admin;
    let bank_ac = req.body.bank_ac;
    let phone_no = req.body.phone_no;
    console.log(req.body);
    let address = req.body.address;
    if (is_admin == 'on') {
        is_admin = 1;
    }
    else {
        is_admin = 0;
    }
    let sql = `INSERT INTO users(name,username,  email, password, is_admin, address,bank_ac,phone_no) VALUES('${name}','${username}' , '${email}', '${password}', ${is_admin}, '${address}', '${bank_ac}' , '${phone_no}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    res.redirect('/login');
}

module.exports={
    RegisterGet,
    RegisterPost
}