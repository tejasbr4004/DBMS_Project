const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const searchGet=(req,res)=>{
    let sql = 'SELECT * FROM stations';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('search', { stations: results, username: req.session.username, no_trains_error: false });
    }); 
}

const searchPost=(req,res)=>{
    console.log(req.body, req.body.source, req.body.destination);
    let source = req.body.source;
    let destination = req.body.destination;
    let no_trains_error = false;
    let sql = `SELECT * FROM TRAIN_INFO WHERE source = '${source}' AND destination = '${destination}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        if (results.length == 0) {
            no_trains_error = true;
            let sql = 'SELECT * FROM stations';
            db.query(sql, (err, results) => {
                if (err) throw err;
                res.render('search', { stations: results, username: req.session.username, no_trains_error: no_trains_error });
            });
        }
        else {
            res.render('searchresult', { data: results, username: req.session.username, no_trains_error: no_trains_error });
        }
    });  
}

module.exports={
    searchGet,
    searchPost
}