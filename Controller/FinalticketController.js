const express = require('express');
const session = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const db = require('../Database/dbConnection');
const puppeteer = require('puppeteer-core');
const path = require('path');

const final_ticketGet = (req, res) => {
    let sql = `SELECT * FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        results[0].date = moment(results[0].date).format('DD-MM-YYYY');
        res.render('final_ticket', { username: req.session.username, data: results });
    });
};

const downloadTicket = async (req, res) => {
    let sql = `SELECT * FROM BOOKINGS WHERE book_id = '${req.params.book_id}'`;
    db.query(sql, async (err, results) => {
        if (err) throw err;
        results[0].date = moment(results[0].date).format('DD-MM-YYYY');
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Final Ticket</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        </head>
        <body>
            <nav style="background: linear-gradient(45deg, #0b0b0b, #b26821);">
                <div class="container-fluid">
                    <h1 style="color: brown;text-align: center;">INDIAN RAILWAYS</h1>
                    
                </div>
            </nav>
            <h3 style="text-align: center;">Your Ticket Is Ready</h3>
            <div style="margin: 30px auto; width: 800px; padding: 20px; background-color: #f0f0f0;">
                <h1 style="text-align: center;">HAPPY JOURNEY</h1>
                <h4>Ticket No: ${results[0].book_id}</h4>
                <div style="display: flex; justify-content: space-between;width:100%;margin:10px">
                    <div style="width:45%">
                        <p>Train No: ${results[0].train_no}</p>
                        <p>From: ${results[0].source}</p>
                        <p>To: ${results[0].destination}</p>
                    </div>
                    <div style="width:45%">
                        <p>Date: ${results[0].date}</p>
                        <p>No. Of Seats: ${results[0].no_of_seats}</p>
                        <p>Ticket Price: ${results[0].price}</p>
                    </div>
                </div>
            <h6 style="text-align: center;">This is a computer-generated ticket, no signature required.</h6>
            </div>


            <footer id="footer" style="position:fixed; bottom:0; width:100%; height:100px">
            <br>
        <center>
            <h6>
                &copy; Railway Reservation system project, reserved And Design developed by Tejas,Vansh
            </h6>
        </center>
    </footer>
        </body>
        </html>`;

        const browser = await puppeteer.launch({
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Update this path as per your Chrome installation
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });

        await browser.close();

        res.setHeader('Content-type', 'application/pdf');
        res.setHeader('Content-disposition', `attachment; filename=ticket_${results[0].book_id}.pdf`);
        res.send(pdfBuffer);
    });
};

module.exports = {
    final_ticketGet,
    downloadTicket
};
