// Saloni Shah
// Data Structure: Assignment 03 
// Date: 21 September 2019

//Lets Get Started
// 1. Create for dependencies i.e. pg, dotenv, async, fs
const { Client } = require('pg');
const dotenv = require('dotenv'); 
dotenv.config();
var async = require('async');
var fs = require('fs');

//2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var addressesForDb = fs.readFileSync("Geo_Address.json");
addressesForDb = JSON.parse(addressesForDb);

// 3. Connect to the AWS RDS Postgres database and insert values
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    let n = 0;
    
    var thisQuery = "INSERT INTO locations VALUES (E'" + value.streetaddress.StreetAddress + "','" + value.streetaddress.City + "', '" + value.streetaddress.State + "'," + value.latitude + ", " + value.longitude + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 