// 1. Create dependencies and configure
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
const moment = require('moment-timezone');

//2. AWS RDS credentials
const { Pool } = require('pg');
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = '06101995';
db_credentials.port = 5432;
const client = new Pool(db_credentials);

// 3. Credentials for Dynamodb 
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
var dynamodb = new AWS.DynamoDB();

//4. Setup for template
var fs = require('fs');
var handlebars = require('handlebars');

//5. Listen on port 8080
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

//6. Linking public folder
app.use(express.static('public'));

//7. Query process blog by Connect to dynamodb
app.get('/blog', async function (req, res) {
    if (req.query == {}){
        res.send(await processBlog());
    } else {
         res.send(await processBlog(req.query.start,req.query.end,req.query.category));
    }
});

//8. Create a function to query data by concepts 

 function processBlog(minDate, maxDate, category){
    return new Promise(resolve => {
        var output = {};
        
        minDate = minDate || "August 1, 2019"
        maxDate = maxDate || "September 10, 2019"; 
        category = category || 'all';

        output.blogpost = [];
        
        if (category != 'all'){
            var params = {
                TableName : "blog",
                KeyConditionExpression: "category = :categoryName and created between :minDate and :maxDate", // the query expression
                ExpressionAttributeValues: { // the query values
                    ":categoryName": {S: category},
                    ":minDate": {S: new Date(minDate).toLocaleString()},
                    ":maxDate": {S: new Date(maxDate).toLocaleString()},
                }
            };
            
            dynamodb.query(params, onScan)

        } else {
            var params = {
                TableName: "blog",
                ProjectionExpression: "created, category, content, title",
                FilterExpression: "created between :minDate and :maxDate",
                 ExpressionAttributeValues: { // the query values
                    ":minDate": {S: new Date(minDate).toLocaleString()},
                    ":maxDate": {S: new Date(maxDate).toLocaleString()}
                }
            };
            
            dynamodb.scan(params, onScan)

        }
        
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Scan succeeded.");
                data.Items.forEach(function(item) {
                    // console.log("***** ***** ***** ***** ***** \n", item);
                      // use express to create a page with that data
                    output.blogpost.push({'title':item.title.S, 'content':item.content.S, 'category':item.category.S,'created':item.created.S});
                });
    
                fs.readFile('blog-handlebars.html', 'utf8', (error, data) => {
                    var template = handlebars.compile(data);
                    var html = template(output);
                    resolve(html);
                });
            }
        };
    });
 }
 
//9. Write script for generating markers on the map 
var hx = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>AA Meetings</title>
        <meta name="description" content="Meetings of AA in Manhattan">
        <meta name="author" content="AA">
        <link rel="stylesheet" href="aa-styles.css?v=1.0">
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""/>
    </head>
    
    <body>
        <div class= "sub-heading">
            <p> Alcoholics Anonymous Meetings <span class = "homepage"> <a href='/'> Home </a> </span></p>
        </div>
        <div id="mapid"></div>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>
        <script>
            var data = 
          `;
          
            var jx = `;
            var mymap = L.map('mapid').setView([40.753636,-73.9780], 13);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1Ijoic2Fsb25pZXNoYWgiLCJhIjoiY2szN2xncHkxMDAwdTNzcDVrMml2a2prdyJ9.uNWsBujASus2I3VQ7SaqYQ'
            }).addTo(mymap);
            for (var i=0; i<data.length; i++) {
                L.marker( [data[i].latitude, data[i].longitude] ).bindPopup(JSON.stringify(data[i].meetings)).addTo(mymap);
            }
        </script>
    </body>
</html>`;
    
//10. Query all the meeting in next twenty four hours    
    app.get('/aadata', function(req, res) {

    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = now.day().toString(); 
    var hourr = now.hour().toString(); 

    // Connect to the AWS RDS Postgres database
   
    const dayLookup = {day_0:"Sundays", day_1:"Mondays", day_2:"Tuesdays", day_3:"Wednesdays", day_4:"Thursdays", day_5:"Fridays", day_6:"Saturdays"};
    var today = dayLookup['day_'+ dayy];
    // console.log('day_'+ dayy);
    // console.log(now);
    // console.log(hourr);
    
    // SQL query 
    // var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
    //              FROM aaData
    //              GROUP BY latitude, longitude, zone;`;
    
    var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('Meeting Name',meeting_name, 'Address', street_address, 'Start Time', meeting_start_time, 'Type', meeting_type)) as meetings
                 FROM aaData
                 GROUP BY latitude, longitude, zone;`;
                 
                              
    // var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
    //              FROM aaData
    //             WHERE meeting_day = ` + today + //'and meeting_start_time >= ' + hourr +
    //              `GROUP BY latitude, longitude, zone;`;
                
                
    // var thisQuery = `SELECT latitude, longitude, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
    //               FROM aaData 
    //               WHERE meeting_start_time = ` + hourr +  
    //              `GROUP BY latitude, longitude
    //              ;`;
                        
    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            // client.end();
            // console.log('AA) responded to request for aa meeting data');
            // console.log(thisQuery)
            // console.log(resp)
        }
    });
});

//11. Query Sensor Data 
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
            // console.table(res.rows);
            sensordata.push(res.rows);
        }
        //  client.end();
    });
    

 