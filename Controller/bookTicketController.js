const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');
const nodemailer = require('nodemailer');
require('dotenv').config();



// Configure nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    port: 587, // SMTP port for secure SSL/TLS connection
    secure: true // true for 465, false for other ports
});

// const book_ticketPost=(req,res)=>{
//     let train_no = req.params.train_no;
//     let date = req.session.date;
//     console.log(train_no, req.body);
//     let sql = `SELECT seats_available FROM SEAT_AVAILABILITY WHERE train_no = '${train_no}' AND DATE = '${date}' AND SEAT_CLASS = '${req.session.seat_class}'`;
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         if (results[0].seats_available > 0 && req.body.no_of_seats > 0 && req.body.no_of_seats <= results[0].seats_available) {
//             sql = `UPDATE SEAT_AVAILABILITY SET SEATS_AVAILABLE = SEATS_AVAILABLE - ${req.body.no_of_seats} WHERE train_no = '${train_no}' AND DATE = '${date}' AND SEAT_CLASS = '${req.session.seat_class}'`;
//             db.query(sql, (err, results) => {
//                 if (err) throw err;
//                 console.log(results);
//             });
//             sql = `SELECT * FROM TRAIN_INFO  WHERE train_no = '${train_no}'`;
//             db.query(sql, (err, results) => {
//                 let price = 1000;
//                 if (req.session.seat_class == 'SL') {
//                     price = 700;
//                 }
//                 if (err) throw err;
//                 console.log(results);
//                 sql = `INSERT INTO BOOKINGS(username, train_no, source, destination, date, price ,seat_class ,no_of_seats) VALUES('${req.session.username}', '${train_no}', '${results[0].source}', '${results[0].destination}', '${date}', '${price * req.body.no_of_seats}' , '${req.session.seat_class}', '${req.body.no_of_seats}')`;
//                 db.query(sql, (err, results) => {
//                     if (err) throw err;
//                     console.log(results);
//                 });
//                 res.render('ticket_booked', { username: req.session.username });
//             });
//         }
//         else {
//             req.session.error_noseat = 1;
//             res.redirect('/book/' + train_no);
//         };

//     })   
// }

// module.exports={
//     book_ticketPost
// }

const book_ticketPost = (req, res) => {
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
            sql = `SELECT * FROM TRAIN_INFO WHERE train_no = '${train_no}'`;
            db.query(sql, (err, trainResults) => {
                let price = 1000;
                if (req.session.seat_class == 'SL') {
                    price = 700;
                }
                if (err) throw err;
                console.log(trainResults);

                // Retrieve user's email from the users table
                sql = `SELECT email FROM users WHERE username = '${req.session.username}'`;
                db.query(sql, (err, userResults) => {
                    if (err) throw err;
                    const userEmail = userResults[0].email;

                    // Insert booking details
                    sql = `INSERT INTO BOOKINGS(username, train_no, source, destination, date, price, seat_class, no_of_seats) VALUES('${req.session.username}', '${train_no}', '${trainResults[0].source}', '${trainResults[0].destination}', '${date}', '${price * req.body.no_of_seats}', '${req.session.seat_class}', '${req.body.no_of_seats}')`;
                    db.query(sql, (err, bookingResult) => {
                        if (err) throw err;
                        console.log(bookingResult);

                        // Send booking confirmation email
                        const mailOptions = {
                            from: process.env.EMAIL_USER,
                            to: userEmail,
                            subject: 'Ticket Booking Confirmation',
                            text: `Dear ${req.session.username},\n\nYour ticket has been successfully booked.\n\nDetails:\nTrain Number: ${train_no}\nTrain Name: ${trainResults[0].name}\nSource: ${trainResults[0].source}\nDestination: ${trainResults[0].destination}\nDate: ${date}\nDeparture Time is ${trainResults[0].start_time} And Expected Time to reach destination is ${trainResults[0].end_time}\nSeat Class: ${req.session.seat_class}\nNumber of Seats: ${req.body.no_of_seats}\nTotal Price: ${price * req.body.no_of_seats}\n\n\nThank you for booking with us.\n\n\n\nBest regards,\ntejasVansh Railway Reservation`
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Email sent: ' + info.response);
                        });

                        res.render('ticket_booked', { username: req.session.username });
                    });
                });
            });
        } else {
            req.session.error_noseat = 1;
            res.redirect('/book/' + train_no);
        }
    });
}

module.exports = {
    book_ticketPost
}