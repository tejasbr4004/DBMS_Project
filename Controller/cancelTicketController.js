const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');

const cancel_ticketGet=(req,res)=>{
    let sql = `SELECT * FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        sql = `DELETE FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
        db.query(sql, (err, results) => {
            if (err) throw err;
            res.redirect('/booking_history');
        });

    });
}

module.exports={
    cancel_ticketGet
}