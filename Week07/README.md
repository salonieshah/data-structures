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

#### Intent </br>
The intent was to create one table that contains all the information of each meeting, addreess, accessibility and zone as per my scematic model discussed in Assignment 4.<br/>
![Data Structure_1](https://github.com/salonieshah/data-structures/blob/master/Week04/Data%20Structure_Backhand%20Process.png) <br/> 



#### A. Parse and clean all relevant data for all the zones <br/>

1. Create two dependencies i.e. pg and dotenv<br/>

2. Create an empty array<br/>
    
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
    
5. Find the elements of a particular style which belongs to the item and push it into array. <br/>
I targeted each table row and created a function that targets children using style as an attribute. I used if...else if statement to target all the elements of the addresses in one attempt and creating a common object containing all the meeting details, addresses and accessibility details.</br>
```
 $('tr').each(function(j, trElem) {
            //let id = j;
            var allDetails = {};
            allDetails.id = j;
            $(trElem).children().each(function(i,elem) {
                
                //Contents:Zone, StreetAdress, City, State, Zipcode
                if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px'){
                    //Zone, Street Address, City, State, Zipcode
                    var thisLocation = {};
                    // thisLocation.id = j;
                    var zone = file.match(/\d+/);
                    thisLocation.zone = zone[0];
                    //thisLocation.zone = '05';
                    thisLocation.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0].split('(')[0].replace("East ", "E ").replace("E ", "East ").replace("Street ", "St ").replace("St ", "Street ");
                    thisLocation.city = 'New York';
                    thisLocation.state = 'NY';
                    thisLocation.zipcode = $(elem).html().split('<br>')[3].trim().substr(- 5);
                    allDetails.locationDetails = thisLocation;
```
6. Understanding Meeting Data 
Similarly cleaning the meeting data and then parsing information by understanding a pattern for day, start time, end time, meeting type. I had an error that each time I consoled I would only get first meetings. Hence I created an array of ojects where each object contains indiviusal meeting details <br/>
```
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
                    eachMeeting.push(splitMeeting)
                    allDetails.meetingDetail = eachMeeting     
                    }
                }
            });
                aaData.push(allDetails);
```
                          
7. Creating a function to removing empty files. 
I targeted each table row in the html files, hence I got a lot of empty objects within my  array. Hence I created function to eliminate all the undefined objects. <br/>
```
var contentDefined = [];
aaData.forEach(aaDataObject => {
    // console.log(contentObject.locationDetails.streetAddress);
    if(aaDataObject.locationDetails != undefined) {
    //   console.log(contentObject.locationDetails.streetAddress); 
      contentDefined.push(aaDataObject);
    }
});
```
8. Creating a JSON
Hence I ended up creating one json file containing an array, which contains multiple objects for each row (address). Hence I have an object containing location details(object), accessibility(object), meeting name(object) and meeting details.(objects within array) <br/>
The objects are divided into objects as discussed in my scematic model in Assignment 4<br/>

![Data Structure](https://github.com/salonieshah/data-structures/blob/master/Week04/Data%20Structure.png)<br/>
```
[{"id":4,
"locationDetails":{"zone":"01","streetAddress":"20 Cardinal Hayes Place","city":"New York","state":"NY","zipcode":"10007"},
"accessibility":false,
"meetingName":{"meetingName":"A DESIGN FOR LIVING"},
"meetingDetail":[{"id":4,"day":"Thursdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"OD"},
                 {"id":4,"day":"Tuesdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"B"}]}]
```
<br/>

#### B. Geocode all the locations for all the zones <br/>

1. Create for dependencies i.e. request, async, fs, dotenv and Get TAMU api key<br/>
2. Read the JSON file and parse the contents of the file.<br/>
3. Created an empty array to contain the addresses 
4. Use .eachSeries in the async module to iterate over an array and operate on each item in the array in series<br/>
```
async.eachSeries(contentDefined, function(value, callback) {
    var address = value.locationDetails.streetAddress;
    // console.log(address);
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + address.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&zip=' + value.zipCode;
    apiRequest += '&format=json&version=4.01';
```
5. Requesting the contents in the body of the link by using the request. <br/>
```
request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
```
6. Create a variable containing an object which contains the required information from the body (Street Address, Longitude, Latitude) <br/>            
           ``` var geoLocation = {};
            
            geoLocation.address = tamuGeo['InputAddress'];
            geoLocation.latitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
            geoLocation.longitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
            
            value.geoLocation = geoLocation;```

7. Pushing the object in the empty array that we created at the begining of the file<br/>          
8. Write a .json file containing the values of the array.  <br/>
```
[{"id":4,
"locationDetails":{"zone":"01","streetAddress":"20 Cardinal Hayes Place","city":"New York","state":"NY","zipcode":"10007"},
"accessibility":false,
"meetingName":{"meetingName":"A DESIGN FOR LIVING"},
"meetingDetail":[{"id":4,"day":"Thursdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"OD"},
                 {"id":4,"day":"Tuesdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"B"}],
"geoLocation":{"address":{"StreetAddress":"20 CARDINAL HAYES PL New York NY undef","City":"New York","State":"NY"},
              "latitude":"40.7132514",
              "longitude":"-74.002398"}},
```
<br/>
#### C. Create a table with PostgreSQL and query the contents <br/>

###### a. Create a Table<br/>
1. Create two dependencies i.e. pg and dotenv<br/>
2. Connect to the AWS RDS Postgres database<br/>
3. SQL statement to create a table<br/>
I am creating one table with all the details of location, geocodes, meeting name, meeting details and accessibility. <br/>
```var thisQuery = [];
thisQuery +="CREATE TABLE aaData (Location_Id serial primary key, Zone int, Street_Address varchar(100), City varchar(10), State varchar(5),  Zipcode varchar(5), Latitude double precision, Longitude double precision, Accessibity boolean, Meeting_Name varchar(50), Meeting_Day varchar(50), Meeting_Start_Time time,  Meeting_End_Time time, Meeting_Time varchar(5),  Meeting_Type varchar(5));";
```
<br/>

###### b. Add the data into the table <br/>
/Lets Get Started
1. Create for dependencies i.e. pg, dotenv, async, fs <br/>
2. AWS RDS POSTGRESQL INSTANCE <br/>
3. Read the JSON and load it in a variable <br/>
4. Connect to the AWS RDS Postgres database and insert values<br/>
5. Use async.each series to iterate over each item in an array.<br/>
I have used async function within a async function as my meeting details are an array and it helps in iterate over each item to form content for the table <br/>
```
async.eachSeries(addressesForDb, function(value, callback) {
    async.eachSeries(addressesForDb.meetingDetail, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    let n = 0;
    console.log(value.addressesForDb);
    var thisQuery = "INSERT INTO aaData VALUES (E'" + addressesForDb.id + "','" + value.locationDetails.zone + "','" + value.locationDetails.streetAddress + "','" + value.locationDetails.city + "','" + value.locationDetails.state + "','" + value.locationDetails.zipcode + "','" + value.geoLocation.latitude + "','" + value.geoLocation.longitude + "','" + value.accessibility + "','" + value.meetingName.meetingName + "','" + value.meetingDetail.day + "','" + value.meetingDetail.startTime +"','" + value.meetingDetail.endTime +"','" + value.meetingDetail.time +"','" + value.meetingDetail.type +"');";
```

###### c. Query the content of the table <br/>

1. Create three dependencies i.e. pg, fs and dotenv <br/>
2. AWS RDS POSTGRESQL INSTANCE <br/>
3. Connect to the AWS RDS Postgres database<br<br/>
4. Sample SQL statement to query the entire contents of a table<br/>

```
var thisQuery = "SELECT * FROM aaData;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    fs.writeFileSync('Assignment_7_e.json', JSON.stringify(res.rows));
    client.end();
});
```
























