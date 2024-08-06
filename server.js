const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
//express-session
const session = require('express-session');
//import moment
const moment = require('moment');
// const isLoggedIn = require('./middleware');
const router=require('./routes/Route');
const connectToDatabase=require('./Database/dbConnection');




//create an expres-session

const sessionConfig = {
    name: 'session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};


//connect to mysql

// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'tejasbr',               //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Your_project_Password';
//     database: 'dbmsproject'
// });


//check if db is connected
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySql Connected...');
// });


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, "public/index.css")));//used as one of  boilerplate scripts
app.use(session(sessionConfig));


app.use(router);






//----------------------------------------------------Routes----------------------------------------------------------------------------------------------------------------------------------



const port = 5000;
app.listen(port, () => {
        console.log(`Serving on port ${port}`)
    })
    
    
    
// connectToDatabase().then(()=>{
//     app.listen(port,()=>{
//         console.log(`app listening to port ${port}....`);
//     });
// });