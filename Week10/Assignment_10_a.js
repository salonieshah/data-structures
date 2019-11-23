// 1. Create dependencies and configure
var express = require('express'), // npm install express
    app = express();
var dotenv = require('dotenv');
    dotenv.config();
    const { Client } = require('pg');
    var fs = require('fs');
    const async = require ("async");

// 2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;    


// 3. Credentials for Dynamodb 
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

//4. Connect to the AWS RDS Postgres database for getting aa and sensor data
const client = new Client(db_credentials);
client.connect();

//5. Create homepage
app.get('/', function(req, res) {
   res.send(`<h1>Data Structures</h1>
            <ul>
            <li> <a href= /aadata> AA Meetings </a></li>
            <li> <a href= /processblog> Green will Leave </a></li>
            <li> <a href= /sensordata> Heat for Heat </a></li>
            </ul>`);
});

//6. Query aaData 
var aadata = []

app.get('/aadata', function(req, res) {
    res.send(aadata);
});

// Sample SQL statement to query lat/long for meetings at the address 109 West 129th Street, New York, NY 10027:
// var aadata_query1 = "SELECT street_address FROM aaData;";
// var aadata_query1 = "SELECT DISTINCT street_address FROM aaData;";
// var aadata_query1 = "SELECT * FROM aaData WHERE meeting_start_time  BETWEEN 07:00:00 AND 10:00:00;";
// var aadata_query1 = "SELECT * FROM aaData WHERE zone = '5';";
// var aadata_query1 = "SELECT * FROM aaData WHERE zone = '5' AND meeting_day = 'Saturdays' OR zone = '5' AND meeting_day = 'Sundays' ;";
var aadata_query1 = "SELECT * FROM aaData WHERE zone = '5' AND meeting_day = 'Saturdays' AND meeting_start_time = '06:00:00' ;";
// var aadata_query1 = "SELECT DISTINCT street_address FROM aaData;";

client.query(aadata_query1, (err, res) => {
    if (err) {throw err}
    else {
        aadata.push(res.rows);
        console.log(aadata);
        // client.end();
    }
});

//7. Query Sensor Data 
var sensordata = [];

app.get('/sensordata', function(req, res) {
    res.send(sensordata);
});

// var sensordata_query1 = "SELECT * FROM tempsensor;"; // print all values
// var sensordata_query1 = "SELECT COUNT (*) FROM tempsensor;"; // print the number of rows
// var sensordata_query1 = "SELECT temperature, COUNT (*) FROM tempsensor GROUP BY temperature;"; // print the number of rows for each sensorValue

var sensordata_query1= `WITH newSensorData as (SELECT time - INTERVAL '5 hours' as estTime, * FROM tempsensor)
                        SELECT
                            EXTRACT (MONTH FROM estTime) as sensorMonth,
                            EXTRACT (DAY FROM estTime) as sensorDay,
                            EXTRACT (HOUR FROM estTime) as sensorHour,
                            AVG (temperature::int) as temperature
                            FROM newSensorData
                            GROUP BY sensorMonth, sensorDay, sensorHour
                            ORDER BY sensorMonth, sensorDay, sensorHour;`;

    client.query(sensordata_query1, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
            sensordata.push(res.rows);
        }
         client.end();
    });
    

app.get('/processblog', function(req, res) {

//8. Query process blog by Connect to dynamodb
var dynamodb = new AWS.DynamoDB();

//9. Sample statement to blog entries from 'New York' category between 'August 1 2019' and 'September 1 2019' 
var params = {
    TableName : "blog",
     KeyConditionExpression: "category = :categoryName and created between :minDate and :maxDate", // the query expression
    ExpressionAttributeValues: { // the query values
        ":categoryName": {S: "Concepts"},
        ":minDate": {S: new Date("August 1, 2019").toLocaleString()},
        ":maxDate": {S: new Date("September 1, 2019").toLocaleString()},
    }
};


dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
              res.send(data);

        });
    }
});
});

//10. listen on port 8080
app.listen(8080, function() {
    console.log('Success');
});
 
