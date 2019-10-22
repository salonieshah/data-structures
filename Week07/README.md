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

2. Create an empty array<br/>
    
3. Load the meetings text file into a variable content and create a loop that repeats the function for each file.<br/>    
          
4. Load content into cheerio object<br/>
    
5. Find the elements of a particular style which belongs to the item and push it into array. <br/>
I targeted each table row and created a function that targets children using style as an attribute. I used if...else if statement to target all the elements of the addresses in one attempt and creating a common object containing all the meeting details, addresses and accessibility details.</br>

6. Understanding Meeting Data 
Similarly cleaning the meeting data and then parsing information by understanding a pattern for day, start time, end time, meeting type. I had an error that each time I consoled I would only get first meetings. Hence I created an array of ojects where each object contains indiviusal meeting details <br/>
                          
7. Creating a function to removing empty files. 
I targeted each table row in the html files, hence I got a lot of empty objects within my  array. Hence I created function to eliminate all the undefined objects. <br/>

8. Creating a JSON
Hence I ended up creating one json file containing an array, which contains multiple objects for each row (address). Hence I have an object containing location details(object), accessibility(object), meeting name(object) and meeting details.(objects within array) <br/>

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


