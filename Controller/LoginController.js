const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const LoginGet=(req,res)=>{
    res.render('login', { username: req.session.username });
}

const LoginPost=(req,res)=>{
    let sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    let values = [req.body.username, req.body.password];
    db.query(sql, values, (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = req.body.username;
            req.session.error_noseat = 0;
            console.log(req.session.username);
            res.redirect(req.session.returnTo || '/');
        } else {
            res.send('Incorrect Username and/or Password!');
        }
        res.end();
    });
}

module.exports={
    LoginGet,
    LoginPost
}