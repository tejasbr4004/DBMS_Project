// const express=require('express');
// const session = require('express-session');
// const moment = require('moment');
// const methodOverride = require('method-override');
// const db=require('../Database/dbConnection');

// const cancel_ticketGet=(req,res)=>{
//     let sql = `SELECT * FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         sql = `DELETE FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
//         db.query(sql, (err, results) => {
//             if (err) throw err;
//             res.redirect('/booking_history');
//         });

//     });
// }

// module.exports={
//     cancel_ticketGet
// }




const express = require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db = require('../Database/dbConnection');

const cancel_ticketGet = (req, res) => {
    const book_id = req.params.book_id;

    let sql = `SELECT * FROM BOOKINGS WHERE book_id = '${book_id}'`;
    db.query(sql, (err, bookingResults) => {
        if (err) throw err;

        if (bookingResults.length > 0) {
            const booking = bookingResults[0];
            const username = booking.username;

            sql = `SELECT * FROM USERS WHERE username = '${username}'`;
            db.query(sql, (err, userResults) => {
                if (err) throw err;

                if (userResults.length > 0) {
                    const user = userResults[0];

                    const refundDetails = {
                        user: user.name,
                        username: user.username,
                        train_no: booking.train_no,
                        seat_class: booking.seat_class,
                        book_date: booking.date,
                        cancel_date: moment().format('YYYY-MM-DD'),
                        source: booking.source,
                        destination: booking.destination,
                        book_id: booking.book_id,
                        bank_acc: user.bank_ac,
                        phone_no: user.phone_no,
                        refund_price: booking.price
                    };

                    sql = `DELETE FROM BOOKINGS WHERE book_id = '${book_id}'`;
                    db.query(sql, (err, results) => {
                        if (err) throw err;
                        res.render('refund', { refundDetails ,username: req.session.username});
                    });
                } else {
                    res.status(404).send('User not found');
                }
            });
        } else {
            res.status(404).send('Booking not found');
        }
    });
};

module.exports = {
    cancel_ticketGet
};
