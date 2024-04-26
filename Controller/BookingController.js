const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const bookingGet=(req,res)=>{
    let train_no = req.params.train_no;
    let sql1 = `SELECT * FROM   TRAIN_INFO  WHERE train_no = '${train_no}'`;
    db.query(sql1, (err, results) => {
        if (err) throw err;
        console.log(results, results[0].train_no);
        res.render('book_ticket', { data: results, book_data: null, username: req.session.username, error: req.session.error_noseat });
    });  
}


const bookingPost=(req,res)=>{
    req.session.error_noseat = 0;
    let train_no = req.params.train_no;
    let date = req.body.date;
    req.session.date = req.body.date;
    req.session.seat_class = req.body.class;
    console.log(req.session.date);
    let today = new Date().toISOString().slice(0, 10)
    if (date<today)
    {
        req.session.error_noseat = 2;
        res.redirect('/book/' + train_no);
        return;
    }
    let seat_class = req.body.class;
    let data = [];
    let sql = `SELECT * FROM   TRAIN_INFO  WHERE train_no = '${train_no}'`;
    let sql1 = `SELECT * FROM SEAT_AVAILABILITY WHERE train_no = '${train_no}' AND DATE = '${date}' AND SEAT_CLASS ='${req.session.seat_class}'; `;

    db.query(sql, (err, results) => {
        if (err) throw err;
        //console.log(results);
        data = results;
    });
    db.query(sql1, (err, results) => {
        if (err) throw err;
        console.log(results[0], data);
        if (results[0] == null) {
            let price = 1000;
            if (req.session.seat_class == 'SL') {
                price = 700;
            }
            sql = `INSERT INTO SEAT_AVAILABILITY(train_no, DATE, SEAT_CLASS, SEATS_AVAILABLE , PRICE) VALUES('${train_no}', '${date}', '${req.session.seat_class}', 100 , ${price})`;
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.log("DATA INSERTED suuccesfully");
            })
            db.query(sql1, (err, results) => {
                if (err) throw err;
                console.log(results);
                res.render('book_ticket', { data: data, book_data: results[0], username: req.session.username, error: req.session.error_noseat });
            });
        }
        else {
            res.render('book_ticket', { data: data, book_data: results[0], username: req.session.username, error: req.session.error_noseat });
        }

    });   
}

module.exports={
    bookingGet,
    bookingPost
}