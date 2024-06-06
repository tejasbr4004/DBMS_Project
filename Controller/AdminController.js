const express = require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db = require('../Database/dbConnection');


const AdminGet = (req, res) => {
    if (req.session.loggedin) {
        let fromDate = req.query['from-date'];
        let toDate = req.query['to-date'];
        let sql = `
            SELECT users.name, users.username, bookings.train_no, bookings.seat_class, bookings.date,
                   bookings.source, bookings.destination, bookings.book_id, users.phone_no, users.address
            FROM bookings
            JOIN users ON bookings.username = users.username
            WHERE bookings.date BETWEEN ? AND ?;
        `;
        let values = [fromDate, toDate];
        db.query(sql, values, (err, results) => {
            if (err) {
                throw err;
            }
            res.render('admin', {
                bookings: results,
                username: req.session.username
            });
        });
    } else {
        res.send("error");
    }
}

module.exports = {
    AdminGet,
}
