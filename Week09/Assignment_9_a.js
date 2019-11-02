// Saloni Shah
// Data Structure: Assignment 09 
// Date: 1 November 2019

//Lets Get Started
// 1. Create two dependencies i.e. pg and dotenv
const { Client } = require('pg'); // npm install pg
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config();

// 2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
//  console.log(db_credentials.password);

// 3. Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// 4. SQL statement to create a table: 
var thisQuery = [];
thisQuery +="CREATE TABLE tempsensor (temperature double precision, time timestamp DEFAULT current_timestamp);";


client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
