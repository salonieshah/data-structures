// Saloni Shah
// Data Structure: Assignment 07 
// Date: 22 October 2019

//Lets Get Started
// 1. Create dependencies and configure
const { Client } = require('pg');
const cTable = require('console.table');
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
// console.log(client);

//4. Sample SQL statement to query meetings at 619 LEXINGTON AVE New York NY 
var thisQuery = `SELECT * FROM aaData WHERE Street_Address = '273 Bowery Street'`;
//var thisQuery = "SELECT mtgday, mtgtime, mtglocation, mtgaddress, mtgtypes FROM aadata WHERE mtgday = 'Monday' and mtghour >= 7;";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.log('query successful');
        console.table(res.rows);
        client.end();
    }
});