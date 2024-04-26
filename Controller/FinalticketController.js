const express=require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db=require('../Database/dbConnection');


const final_ticketGet=(req,res)=>{
    let sql = `SELECT * FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
    db.query(sql, (err,results) => {
        if(err) throw err;
       // console.log(results[0].book_id );
        results[0].date = moment(results[0].date).format('DD-MM-YYYY');
        res.render('final_ticket' , {username : req.session.username , data: results});
    }) 
}

module.exports={
    final_ticketGet
}