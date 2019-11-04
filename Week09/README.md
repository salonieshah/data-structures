## Data Structure
# Week 09
---------------------------------------------------
#### Assignment Date: 30th October 2019<br/>
#### Assignment Due: 4th November 2019 <br/>
#### Assignment Details can be found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_09) <br/>
--------------------------------------------------
The assignment was divided into 3 different sections.<br/>
A. Create a table with PostgreSQL <br/>
B. Insert values using PM2 Runtime <br/>
C. Query contents of the table <br/>

#### A. Create a table with PostgreSQL <br/>
1. Create two dependencies i.e. pg and dotenv <br/>
2. Connect to the AWS RDS Postgres database <br/>
3. SQL statement to create a table<br/>
4. Creating a table containing temperature values and timestamp. <br/>
```
var thisQuery = [];
thisQuery +="CREATE TABLE tempsensor (temperature double precision, time timestamp DEFAULT current_timestamp);";
```
#### B. Insert values using PM2 Runtime<br/>
1. Create for dependencies i.e. pg, request, dotenv<br/>
2. Creating Variables for accessing Photon Particle <br/>
3. AWS RDS POSTGRESQL INSTANCE<br/>
4. Creating a function that documents the temperature data by requesting information from URL and storing it in a variable<br/>
```
var tempData = function() {
    request(device_url, function(error, response, body) {
        var data = JSON.parse(body).result;
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO tempsensor VALUES (" + data + ", DEFAULT);";
        console.log(thisQuery);
        
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};
```
5. Create a new row after every five minutes
```
setInterval(tempData, 300000);
```
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week09/images/Insert_Value_in_Table.JPG) <br/> 

#### Query contents of the table <br/>
1. Create for dependencies i.e. pg, request, dotenv<br/>
2. AWS RDS POSTGRESQL INSTANCE <br/>
3. Connect to the AWS RDS Postgres database <br/>
4. Sample SQL statement to check the tempsensor table  <br/>
```
var thisQuery = "SELECT * FROM tempsensor;"; // print all values
```
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week09/images/Query_1.JPG) <br/> 
```
var secondQuery = "SELECT COUNT (*) FROM tempsensor;"; // print the number of rows
```
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week09/images/Query_2.JPG) <br/> 
```
var thirdQuery = "SELECT temperature, COUNT (*) FROM tempsensor GROUP BY temperature;"; // print the number of rows for each sensorValue
```
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week09/images/Query_3.JPG) <br/> 
