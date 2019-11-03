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
