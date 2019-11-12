## Data Structure
# Week 04
---------------------------------------------------
#### Assignment Date: 18th September 2019<br/>
#### Assignment Due: 23th September 2019 <br/>
#### Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_04.md) <br/>
--------------------------------------------------
Assignment was divided into 5 different sections. All the sections are related to each other. Change in one would affect all the other sections. </br>
A. Schematic Model<br/>
B. Understanding the model through example<br/>
C. Create a table with SQL<br/>
D. Load the table with available information<br/>
E. Query the contents for the table<br/>

#### A. Schematic Model
![Data Structure](https://github.com/salonieshah/data-structures/blob/master/Week04/Data%20Structure.png)<br/>
After analysing available information on the current webpage. I decided to structure the contents into 3 different table which can extract information from each other as needed. <br/>
1. Location table contains the information regarding the locations of different meetings.<br/>
2. Meeting Details table containing all the meeting information.<br/>
3. Miscellaneous table containing the excess information.<br/> 
<br/>

#### B. Schematic Model <br/> 
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week04/Data%20Structure_Backhand%20Process.png) <br/> 
I tried to understand the process to inter-relate the tables by creating a continous table taking an example of specific meeting from my sample.<br/> 
<br/>

#### C. Create a table with SQL<br/>
1. Create and configure two dependencies i.e. pg and dotenv<br/> 
```
const { Client } = require('pg');
const dotenv = require('dotenv'); 
dotenv.config();
```

2. Create a variable containing AWS RDS POSTGRESQL INSTANCE <br/> 
```
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
```

3. Connect to the AWS RDS Postgres database
```
const client = new Client(db_credentials);
client.connect();
```

4. Make a SQL statement to create three tables 
```
thisQuery +="CREATE TABLE locations (locationid serial primary key, zone int, address varchar(100), city varchar(10), state varchar(5), latitude double precision, longitude double precision);";
thisQuery += "CREATE TABLE meetings (meetingid serial primary key, meetingname varchar(100), meetingstarttime varchar(10), meetingendtime varchar(10), meetingday varchar(10), meetingtype varchar(10));";
thisQuery += "CREATE TABLE misc (accessibity boolean, notes varchar(1000));";
```
<br/>

#### D. Load the table with available information<br/>
1. Create and install four dependencies i.e. pg, dotenv, async, fs
``` 
const { Client } = require('pg');
const dotenv = require('dotenv'); 
dotenv.config();
var async = require('async');
var fs = require('fs');
```

2. Create a variable containing AWS RDS POSTGRESQL INSTANCE <br/> 
```
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
```

3. Read and parse the .json file
```
var addressesForDb = fs.readFileSync("Geo_Address.json");
addressesForDb = JSON.parse(addressesForDb);
```

4. Connect to the AWS RDS Postgres database and insert values
```
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO locations VALUES (E'" + value.streetaddress.StreetAddress + "','" + value.streetaddress.City + "', '" + value.streetaddress.State + "'," + value.latitude + ", " + value.longitude + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 
```
<br/>

#### E. Query the contents for the table<br/>
1. Create three dependencies i.e. pg, fs and dotenv<br/>
```
const { Client } = require('pg');
var fs = require('fs');
const dotenv = require('dotenv'); 
dotenv.config();
```
2. Create a variable containing AWS RDS POSTGRESQL INSTANCE <br/>
```
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
```

3. Connect to the AWS RDS Postgres database<br/>
```
const client = new Client(db_credentials);
client.connect();
```

4. Sample SQL statement to query the entire contents of a table: <br/>
```
var thisQuery = "SELECT * FROM locations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    client.end();
});
```
5. The result in the console can be seen below as the values are inserted into the location table. 
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week04/SQL_Console.PNG) <br/> 

#### Issues and Errors
1. I attempted to create a .json file containing the information of location table, but due to some errors it didn't work out. <br/>
2. I also attempted to use some codes for the following which didn't workout very well and responded with errors. i.e. to specify the zone in two digits(05), creating auto increment ids, setting relatable meeting time by using MIN(time) and MAX(time). <br/>

* This is first assignment that I did by myself :)












