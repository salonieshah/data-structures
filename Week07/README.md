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
     var content = fs.readFileSync('data/' + file + '.txt');
      ```
          
4. Load content into cheerio object<br/>
    ```var $ = cheerio.load(content); ```
    
5. Find the elements of a particular style which belongs to the item and push it into array. <br/>
I targeted each table row and created a function that targets children using style as an attribute. I used if...else if statement to target all the elements of the addresses in one attempt and creating a common object containing all the meeting details, addresses and accessibility details.</br>
        ```$('tr').each(function(j, trElem) {
            //let id = j;
            var allDetails = {};
            allDetails.id = j;
            $(trElem).children().each(function(i,elem) {
                
          //Contents:Zone, StreetAdress, City, State, Zipcode
                if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px'){
              //Zone, Street Address, City, State, Zipcode
                    var thisLocation = {};
                    var zone = file.match(/\d+/);
                    thisLocation.zone = zone[0];
                    thisLocation.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0].split('(')[0].replace("East ", "E ").replace("E ", "East ").replace("Street ", "St ").replace("St ", "Street ");
                    thisLocation.city = 'New York';
                    thisLocation.state = 'NY';
                    thisLocation.zipcode = $(elem).html().split('<br>')[3].trim().substr(- 5);
                    allDetails.locationDetails = thisLocation;
                    
               //Accesibility       
                    var accessibility = false;
                    if ($(elem).html().includes('Wheelchair access')){
                      accessibility = 'true';
                    }
                    allDetails.accessibility = accessibility;  
            
                    //Meeting name         
                    var thisMeeting = {};    
                    thisMeeting.meetingName = $(elem).html().split('<br>')[1].split('-')[0].trim().split('(')[0].replace("&apos;","'"); //Last entry
                    allDetails.meetingName = thisMeeting;
                }```

6. Understanding Meeting Data 
Similarly cleaning the meeting data and then parsing information by understanding a pattern for day, start time, end time, meeting type. I had an error that each time I consoled I would only get first meetings. Hence I created an array of ojects where each object contains indiviusal meeting details <br/>
                ```
                // Meetings: Start time, End time, Meeting day, Meeting type
                else if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3;width:350px;'){
                    var meetingDetail = $(elem).text().trim();
                    
                    meetingDetail = meetingDetail.replace(/[ \t]+/g, " ").trim();
                    meetingDetail = meetingDetail.replace(/[\r\n|\n]/g, " ").trim();
                    meetingDetail = meetingDetail.split("        ");
                        
                    var eachMeeting = [];    
                    for (var i=0; i<meetingDetail.length; i++){
                    var splitMeeting = {};
                    splitMeeting.id = j;
                    splitMeeting.day = meetingDetail[i].trim().split(' ')[0];
                    splitMeeting.startTime = meetingDetail[i].trim().split(' ')[2];
                    splitMeeting.endTime = meetingDetail[i].trim().split(' ')[5];
                    splitMeeting.time = meetingDetail[i].trim().split(' ')[3];
                    splitMeeting.type = meetingDetail[i].trim().split(' ')[9];
                    eachMeeting.push(splitMeeting);
                    allDetails.meetingDetail = eachMeeting;  
                    }
                }
            });
                aaData.push(allDetails);
               
                
7. Creating a function to removing empty files. 
I targeted each table row in the html files, hence I got a lot of empty objects within my  array. Hence I created function to eliminate all the undefined objects. <br/>


var contentDefined = [];
aaData.forEach(aaDataObject => {
    // console.log(contentObject.locationDetails.streetAddress);
    if(aaDataObject.locationDetails != undefined) {
    //   console.log(contentObject.locationDetails.streetAddress); 
      contentDefined.push(aaDataObject);
    }
});

<br/>
#### B. Geocode all the locations for all the zones <br/>


