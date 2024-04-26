const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');



const book_ticketPost=(req,res)=>{
    let train_no = req.params.train_no;
    let date = req.session.date;
    console.log(train_no, req.body);
    let sql = `SELECT seats_available FROM SEAT_AVAILABILITY WHERE train_no = '${train_no}' AND DATE = '${date}' AND SEAT_CLASS = '${req.session.seat_class}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        if (results[0].seats_available > 0 && req.body.no_of_seats > 0 && req.body.no_of_seats <= results[0].seats_available) {
            sql = `UPDATE SEAT_AVAILABILITY SET SEATS_AVAILABLE = SEATS_AVAILABLE - ${req.body.no_of_seats} WHERE train_no = '${train_no}' AND DATE = '${date}' AND SEAT_CLASS = '${req.session.seat_class}'`;
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.log(results);
            });
            sql = `SELECT * FROM TRAIN_INFO  WHERE train_no = '${train_no}'`;
            db.query(sql, (err, results) => {
                let price = 1000;
                if (req.session.seat_class == 'SL') {
                    price = 700;
                }
                if (err) throw err;
                console.log(results);
                sql = `INSERT INTO BOOKINGS(username, train_no, source, destination, date, price ,seat_class ,no_of_seats) VALUES('${req.session.username}', '${train_no}', '${results[0].source}', '${results[0].destination}', '${date}', '${price * req.body.no_of_seats}' , '${req.session.seat_class}', '${req.body.no_of_seats}')`;
                db.query(sql, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                });
                res.render('ticket_booked', { username: req.session.username });
            });
        }
        else {
            req.session.error_noseat = 1;
            res.redirect('/book/' + train_no);
        };

    })   
}

module.exports={
    book_ticketPost
}