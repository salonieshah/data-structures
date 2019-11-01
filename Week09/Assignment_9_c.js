// Saloni Shah
// Data Structure: Assignment 09 
// Date: 1 November 2019

//Lets Get Started
// 1. Create for dependencies i.e. pg, cTable
const { Client } = require('pg');
const cTable = require('console.table');

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

//4. Sample SQL statement to check the table 
var thisQuery = "SELECT * FROM tempsensor;"; // print all values

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
    console.table(res.rows);
    }
});