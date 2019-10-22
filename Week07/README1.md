## Data Structure
# Week 07
---------------------------------------------------
#### Assignment Date: 16th October 2019<br/>
#### Assignment Due: 21st October 2019 <br/>
#### Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_07.md) <br/>
--------------------------------------------------
The assignment was divided into 3 different sections.<br/>
A. Parse and clean all relevant data for all the zones <br/>
B. Geocode all the locations for all the zones <br/>
C. Create a table with PostgreSQL and query the contents <br/>

#### A. Parse and clean all relevant data for all the zones <br/>

1. Create two dependencies i.e. pg and dotenv<br/>
    ```
    var fs = require('fs');
    var cheerio = require('cheerio');
    ```
    
2. Create an empty array<br/>
    ``` var aaData =[]; ```
    
3. Load the meetings text file into a variable content and create a loop that repeats the function for each file.<br/>    
```
var filePath = 'data/';
var fileNumber = [
    'm01',  
    'm02',  
    'm03',  
    'm04',  
    'm05',  
    'm06',  
    'm07',  
    'm08',  
    'm09',  
    'm10'
    ]; 
    fileNumber.forEach(file => {
     var content = fs.readFileSync('data/' + file + '.txt') ```
