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
            if(results[0].is_admin==0){
                res.redirect(req.session.returnTo || '/');
            }
            else{
                res.redirect(req.session.returnTo || '/admin');
            }
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






// const express = require('express');
// const session = require('express-session');
// const moment = require('moment');
// const methodOverride = require('method-override');
// const db = require('../Database/dbConnection');

// const router = express.Router();

// const LoginGet = (req, res) => {
//     res.render('login', { username: req.session.username });
// };

// const LoginPost = (req, res) => {
//     let sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     let values = [req.body.username, req.body.password];
//     db.query(sql, values, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         if (results.length > 0) {
//             req.session.loggedin = true;
//             req.session.username = req.body.username;
//             req.session.error_noseat = 0;
//             console.log(req.session.username);
//             if (results[0].is_admin == 0) {
//                 res.redirect(req.session.returnTo || '/');
//             } else {
//                 res.render('admin', { username: req.session.username });
//             }
//         } else {
//             res.send('Incorrect Username and/or Password!');
//         }
//         res.end();
//     });
// };

// const getBookings = (req, res) => {
    // if (req.session.loggedin) {
    //     let fromDate = req.query['from-date'];
    //     let toDate = req.query['to-date'];
    //     let sql = `
    //         SELECT users.name, users.username, bookings.train_no, bookings.seat_class, bookings.date,
    //                bookings.source, bookings.destination, bookings.book_id, users.phone_no, users.address
    //         FROM bookings
    //         JOIN users ON bookings.username = users.username
    //         WHERE bookings.date BETWEEN ? AND ?;
    //     `;
    //     let values = [fromDate, toDate];
    //     db.query(sql, values, (err, results) => {
    //         if (err) {
    //             throw err;
    //         }
    //         res.render('admin', {
    //             bookings: results,
    //             username: req.session.username
    //         });
    //     });
    // } else {
    //     res.send("error");
    // }
// };

// router.get('/login', LoginGet);
// router.post('/login', LoginPost);
// router.get('/bookings', getBookings);

// module.exports = router;

