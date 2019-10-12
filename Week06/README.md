## Data Structure
# Week 06
---------------------------------------------------
#### Assignment Date: 2nd October 2019<br/>
#### Assignment Due: 14st October 2019 <br/>
#### Assignment Details can be found [here](https://github.com/visualizedata/data-structures/tree/master/weekly_assignment_06) <br/>
--------------------------------------------------
The assignment was divided into 2 different sections.<br/>
A. Write and execute a query for AA data PostgreSQL <br/>
B. Write and execute a query for personal blog data in DynamoDB <br/>

#### A. Write and execute a query for AA data PostgreSQL <br/>

My table for AA data consisted of addess, city, state, longitute and latitude. I choose to search for location of '619 LEXINGTON AVE New York NY' as it was repeated multiple times in the dataset.<br/>

1. Code for Query<br/>
```
var thisQuery = `SELECT * FROM locations WHERE address = '619 LEXINGTON AVE New York NY '`;
```

2. Console for the Query<br/>
![Console](https://github.com/salonieshah/data-structures/blob/master/Week06/Images/Query%20for%20AA%20data%20PostgreSQL.JPG)<br/>


#### B. Write and execute a query for personal blog data in DynamoDB  <br/>

The primary key for database was Category, while  the sort key was date. I choose to query for all the entries with category 'New York' category between 'August 1 2019' and 'September 1 2019'<br/>
```

```
![Console](https://github.com/salonieshah/data-structures/blob/master/Week06/Images/Query%20for%20personal%20blog%20data%20in%20DynamoDB.JPG)<br/>
