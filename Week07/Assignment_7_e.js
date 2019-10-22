// Saloni Shah
// Data Structure: Assignment 07
// Date: 19 October 2019

//Lets Get Started
// 1. Create three dependencies i.e. pg, fs and dotenv
const { Client } = require('pg');
var fs = require('fs');
const dotenv = require('dotenv'); 
dotenv.config();



//2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//3. Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

//4. Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM aaData;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    fs.writeFileSync('Assignment_7_e.json', JSON.stringify(res.rows));
    client.end();
});


// function() {
//         fs.writeFileSync('Table_1.json', JSON.stringify(res.rows));
//     };