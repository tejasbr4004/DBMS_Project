const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const booking_historyGet=(req,res)=>{
    let sql = `SELECT * FROM BOOKINGS WHERE username = '${req.session.username}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        for (let i = 0; i < results.length; i++) {
            results[i].date = moment(results[i].date).format('DD-MM-YYYY');
        }
        res.render('booking_history', { data: results, username: req.session.username });
    });
}

module.exports={
    booking_historyGet
}