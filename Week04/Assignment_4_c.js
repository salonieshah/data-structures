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

var addressesForDb = fs.readFileSync("Assignment_7_b.json");
addressesForDb = JSON.parse(addressesForDb);

// 3. Connect to the AWS RDS Postgres database and insert values
async.eachSeries(addressesForDb, function(value, callback) {
    async.eachSeries(addressesForDb.meetingDetail, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    let n = 0;
    console.log(value.addressesForDb);
    var thisQuery = "INSERT INTO aaData VALUES (E'" + addressesForDb.id + "','" + value.locationDetails.zone + "','" + value.locationDetails.streetAddress + "','" + value.locationDetails.city + "','" + value.locationDetails.state + "','" + value.locationDetails.zipcode + "','" + value.geoLocation.latitude + "','" + value.geoLocation.longitude + "','" + value.accessibility + "','" + value.meetingName.meetingName + "','" + value.meetingDetail.day + "','" + value.meetingDetail.startTime +"','" + value.meetingDetail.endTime +"','" + value.meetingDetail.time +"','" + value.meetingDetail.type +"');";
//   var thisQuery = "INSERT INTO aaData VALUES (E'" + meeting.id + "','" + value.locationDetails.zone + "','" + value.locationDetails.streetAddress + "','" + value.locationDetails.city + "','" + value.locationDetails.state + "','" + value.locationDetails.zipcode + "','" + value.geoLocation.latitude + "','" + value.geoLocation.longitude + "','" + value.accessibility + "','" + value.meetingName.meetingName + "','" + value.meetingDetail.day + "','" + value.meetingDetail.startTime +"','" + value.meetingDetail.endTime +"','" + value.meetingDetail.time +"','" + value.meetingDetail.type +"');";
    
    // var thisQuery = "INSERT INTO aaData VALUES (E'" + '1' + "','" +value.locationDetails.streetAddress + "','" + value.streetaddress.City + "', '" + value.streetaddress.State + "'," + value.latitude + ", " + value.longitude + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 2000); 

    });
    }); 
//3. Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

//4. Sample SQL statement to query the entire contents of a table: 
var thisQuery = "SELECT * FROM locations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    fs.writeFileSync('Table_1.json', JSON.stringify(res.rows));
    client.end();
});


// function() {
//         fs.writeFileSync('Table_1.json', JSON.stringify(res.rows));
//     };
