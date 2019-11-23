## Data Structure
# Week 10
---------------------------------------------------
#### Assignment Date: 6th November 2019<br/>
#### Assignment Due: 11th November 2019 <br/>
#### Assignment Details can be found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_10) <br/>
--------------------------------------------------
The assignment was to create a landing page and query some relevant data for 3 previous projects i.e. AA Meetings, Process Blog, Temperature Sensor <br/>

1. Create dependencies and configure <br/>
2. Declate AWS RDS POSTGRESQL INSTANCE <br/>
3. Declare Credentials for Dynamodb <br/>
4.Connect to the AWS RDS Postgres database for getting aa and sensor data <br/>
5.Create Landing Page <br/>
```
app.get('/', function(req, res) {
   res.send(`<h1>Data Structures</h1>
            <ul>
            <li> <a href= /aadata> AA Meetings </a></li>
            <li> <a href= /processblog> Green will Leave </a></li>
            <li> <a href= /sensordata> Heat for Heat </a></li>
            </ul>`);
});
```
6. Write multiple queries for aaData <br/>

The final query gets an array of meetings specific to zone, day and start time. </br>

```
app.get('/aadata', function(req, res) {
    res.send(aadata);
});

// Sample SQL statement to query lat/long for meetings at the address 109 West 129th Street, New York, NY 10027:
var aadata_query1 = "SELECT street_address FROM aaData;";
var aadata_query1 = "SELECT DISTINCT street_address FROM aaData;";
var aadata_query1 = "SELECT * FROM aaData WHERE meeting_start_time  BETWEEN 07:00:00 AND 10:00:00;";
var aadata_query1 = "SELECT * FROM aaData WHERE zone = '5';";
var aadata_query1 = "SELECT * FROM aaData WHERE zone = '5' AND meeting_day = 'Saturdays' OR zone = '5' AND meeting_day = 'Sundays' ;";
var aadata_query1 = "SELECT * FROM aaData WHERE zone = '5' AND meeting_day = 'Saturdays' AND meeting_start_time = '06:00:00' ;";
var aadata_query1 = "SELECT DISTINCT street_address FROM aaData;";

client.query(aadata_query1, (err, res) => {
    if (err) {throw err}
    else {
        aadata.push(res.rows);
        console.log(aadata);
        // client.end();
    }
});
```

7. Write multiple queries for Temperature Sensor<br/>

The final query gets an array of objects with the details of month, day, hour and the average temperature. </br>
```
var sensordata = [];

app.get('/sensordata', function(req, res) {
    res.send(sensordata);
});

var sensordata_query1 = "SELECT * FROM tempsensor;"; // print all values
var sensordata_query1 = "SELECT COUNT (*) FROM tempsensor;"; // print the number of rows
var sensordata_query1 = "SELECT temperature, COUNT (*) FROM tempsensor GROUP BY temperature;"; // print the number of rows for each sensorValue

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
```
8. Write queries for Process Blog <br/>
The final query  gets an array of objects of a specific category between two dates. </br>
```
app.get('/processblog', function(req, res) {

var dynamodb = new AWS.DynamoDB();

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
```
