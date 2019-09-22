// Saloni Shah
// Data Structure: Assignment 03 
// Date: 21 September 2019

//Lets Get Started
// 1. Create for dependencies i.e. pg and dotenv
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
//thisQuery +="CREATE TABLE locations (locationid serial primary key, zone int, address varchar(100), city varchar(10), state varchar(5), latitude double precision, longitude double precision);";
thisQuery +="CREATE TABLE locations (address varchar(100), city varchar(10), state varchar(5), latitude double precision, longitude double precision);";
// thisQuery += "CREATE TABLE meetings (meetingid serial primary key, meetingname varchar(100), meetingstarttime varchar(10), meetingendtime varchar(10), meetingday varchar(10), meetingtype varchar(10));";
// thisQuery += "CREATE TABLE misc (accessibity boolean, notes varchar(1000));";
// Sample SQL statement to delete a table: 
//var thisQuery = "DROP TABLE locations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});