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

//3. Credentials for Dynamodb 
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

//7. Query Process Blog by Connecting to dynamodb
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
        
        minDate = minDate || "August 1 2019"
        maxDate = maxDate || "December 10 2020"; 
        category = category || 'all';
        // console.log(new Date(maxDate).toLocaleString())
        output.blogpost = [];
        
        if (category != 'all'){
            var params = {
                TableName : "blog",
                KeyConditionExpression: "category = :categoryName and created between :minDate and :maxDate", // the query expression
                ExpressionAttributeValues: { // the query values
                    ":categoryName": {S: category},
                    ":minDate": {S: new Date(minDate).toISOString()},
                    ":maxDate": {S: new Date(maxDate).toISOString()},
                }
            };
            
            dynamodb.query(params, onScan)

        } else {
            var params = {
                TableName: "blog",
                ProjectionExpression: "created, category, content, title",
                FilterExpression: "created between :minDate and :maxDate",
                 ExpressionAttributeValues: { // the query values
                    ":minDate": {S: new Date(minDate).toISOString()},
                    ":maxDate": {S: new Date(maxDate).toISOString()}
                }
            };
            
            dynamodb.scan(params, onScan)

        }

//9. Use express-handlebars to get the output 

        function onScan(err, data) {
            if (err) {
                console.error("Error. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Scan succeeded.");
                data.Items.forEach(function(item) {
                    // console.log(item)
                    // console.log("***** ***** ***** ***** ***** \n", item);
                    output.blogpost.push({'title':item.title.S, 'content':item.content.S, 'category':item.category.S,'created':moment(item.created.S).format("LL")});
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
        <div id="mapid">
        <div id = "notes">
            <h1> Meeting Type </h1>
            <p> 
                B: Beginners meeting <br>
                BB: Big Book meeting <br>
                S: Step meeting <br>
                OD: Open Discussion meeting <br>
                C: Closed Discussion Meeting <br>
                O: Open meeting <br>
            </p>
        </div>
        </div>
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>
        <script>
            var data = 
          `;
            
            var jx = `;
            var mymap = L.map('mapid').setView([40.753636,-73.9780], 13);
            
             L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            	maxZoom: 18,
            	subdomains: 'abcd',
                id: 'mapbox.streets',
                    }).addTo(mymap);
            

                function popup (data) {
                        var html = '';
                        for (var i=0; i<data.length; i++) {
                            if (i === 0) {
                                html += '<p class = "address">' + data[i].address + '</p>'
                                html += '<p class = "access">' + data[i].access + '</p>'
                            }
                                    html += '<ul>'
                                        html += '<li class = "name">' + data[i].name + '</li>'
                                        html += '<li class = "type">' + data[i].types + '</li>'
                                        html += '<li class = "day">' + data[i].day + '</li>'
                                            html += '<ul>'
                                                html += '<li class = "time">' + data[i].time + '</li>'
                                            html += '</ul>'
                                    html += '</ul>'
                    }
                    console.log(html)
                    return html
                }
                
                for (var i=0; i<data.length; i++) {
                        L.marker( [data[i].latitude, data[i].longitude] ).bindPopup(popup(data[i].meetings), {maxHeight: 250}, {maxWidth: 100}).addTo(mymap);
                    }
            
            
        </script>
    </body>
</html>`;

//  function popup (data) {
//                         var html = '';
//                         for (var i=0; i<data.length; i++) {
//                             if (i === 0) {
//                                 html += '<p>' + data[i].address + '</p>'
//                                 html += '<p>' + data[i].access + '</p>'
//                             }
//                                     html += '<ul>'
//                                         html += '<li>' + data[i].name + '</li>'
//                                         html += '<li>' + data[i].types + '</li>'
//                                         html += '<li>' + data[i].day + '</li>'
//                                             html += '<ul>'
//                                                 html += '<li>' + data[i].time + '</li>'
//                                             html += '</ul>'
//                                     html += '</ul>'
//                     }
//                     console.log(html)
//                     return html
//                 }

//10. Query all the meeting in next twenty four hours    
    app.get('/aadata', function(req, res) {

    var now = moment.tz(Date.now(), "America/New_York"); 
    var dayy = now.day().toString(); 
    var hourr = now.hour().toString();
    var min = now.minute().toString();
    var sec = now.second().toString();
    var ampm = 'AM';
    if (hourr > 12) {
        hourr = hourr - 12;
        ampm = 'PM'
    }

    if (hourr < 9) {
        hourr = '0' + hourr;
    }
    
     if (sec < 9) {
        sec = '0' + sec;
    }
    
    if (min < 9) {
        min = '0' + min;
    }
    
    const client = new Pool(db_credentials);
    
    const dayLookup = {day_0:"Sundays", day_1:"Mondays", day_2:"Tuesdays", day_3:"Wednesdays", day_4:"Thursdays", day_5:"Fridays", day_6:"Saturdays"};
    var today = dayLookup['day_'+ dayy];
    var current_time = hourr + ':' + min + ':' + sec
    
    var tom = dayy * 1 +1
    var tommorow = dayLookup['day_'+ tom]; 
    
    // console.log('day_'+ dayy);
    // console.log(now);
    // console.log(hourr);
    // console.log(dayy);
    // console.log(today);
    // console.log(ampm);
    // console.log(sec);
    // console.log(current_time)
    
    // SQL query 

    // var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
    //             FROM aaData
    //             WHERE Meeting_Day = '` + today + "' and meeting_start_time >= '" + current_time + 
    //                                 "' and meeting_time = '" + ampm +     
    //             `' GROUP BY latitude, longitude, zone;`;
          
        // console.log(thisQuery)
        
        
        if (ampm == "AM"){ var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', city, 'city', meeting_start_time, 'ti', meeting_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
                FROM aaData
                WHERE (Meeting_Day = '` + today + "' and meeting_start_time >= '" + current_time + 
                                    "' and meeting_time = '" + ampm +   
                `')
                OR (Meeting_Day = '` + today + "' and meeting_time = 'PM"+ `')
                OR (Meeting_Day = '` + tommorow + "' and meeting_start_time <= '" + current_time + 
                                    "' and meeting_time = '" + ampm +   
                `')
                GROUP BY latitude, longitude, zone;`;   
                
        } else if (ampm == "PM")
                { var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'ti', meeting_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
                    FROM aaData
                    WHERE (Meeting_Day = '` + today + "' and meeting_start_time >= '" + current_time + 
                                        "' and meeting_time = '" + ampm +   
                    `')
                    OR (Meeting_Day = '` + today + "' and meeting_time = 'AM"+ `')
                    OR (Meeting_Day = '` + tommorow + "' and meeting_start_time <= '" + current_time + 
                                        "' and meeting_time = '" + ampm +   
                `')
                GROUP BY latitude, longitude, zone;`;   
        }
                
    client.connect();    
    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            // console.log(qres.rows)
            client.end();
            // console.log('AA) responded to request for aa meeting data');
            // console.log(thisQuery)
            // console.log(resp)
        }
    });
});

//11. Query Sensor Data 
const indexSource = fs.readFileSync("sensor.html").toString();
var template = handlebars.compile(indexSource, { strict: true });

app.get('/sensordata', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query 
    var sensordata_query = `WITH newSensorData as (SELECT time - INTERVAL '5 hours' as estTime, * FROM tempsensor)
                        SELECT
                            EXTRACT (MONTH FROM estTime) as sensorMonth,
                            EXTRACT (DAY FROM estTime) as sensorDay,
                            EXTRACT (HOUR FROM estTime) as sensorHour,
                            AVG (temperature::int) as temperature
                            FROM newSensorData
                            GROUP BY sensorMonth, sensorDay, sensorHour
                            ORDER BY sensorMonth, sensorDay, sensorHour;`;

    client.connect();
    client.query(sensordata_query, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.end(template({sensordata: JSON.stringify(qres.rows)}));
            client.end();
            // console.table(res);
            console.log('1) responded to request for sensor graph');
        }
    });
});  