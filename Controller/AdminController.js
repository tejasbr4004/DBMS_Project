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
            SELECT users.name as custname, users.username, train_info.name,bookings.train_no, bookings.seat_class, bookings.date,
                   bookings.source, bookings.destination, bookings.book_id, users.phone_no, users.address
            FROM bookings
            JOIN users ON bookings.username = users.username
            JOIN train_info ON bookings.train_no=train_info.train_no
            WHERE bookings.date BETWEEN ? AND ?;
        `;
        let values = [fromDate, toDate];
        db.query(sql, values, (err, bookings) => {
            if (err) {
                throw err;
            }

            // Query to get the details and count of the refund table
            let refundDetailsSql = 'SELECT * FROM refund';
            db.query(refundDetailsSql, (err, refunds) => {
                if (err) {
                    throw err;
                }

                res.render('admin', {
                    bookings: bookings,
                    username: req.session.username,
                    refunds: refunds,
                    refundCount: refunds.length
                });
            });
        });
    } else {
        res.send("error");
    }
}

module.exports = {
    AdminGet,
}
