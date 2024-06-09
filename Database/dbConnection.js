const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tejasbr',               //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Your_project_Password';
    database: 'dbmsproject'
});

connection.connect((err) => {
    if (err) {
        console.error('Failure..Could not connect to MySQL...', err);
        return;
    }
    console.log('Successfully connected to MySQL...');
});

module.exports = connection;
