## Data Structure
# Week 03
---------------------------------------------------
#### Assignment Date: 11th September 2019<br/>
#### Assignment Due: 16th September 2019 <br/>
#### Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_03.md) <br/>
--------------------------------------------------
1. Create four dependencies request, async, file server(fs) and dotenv. <br/>
```
var request = require('request'); 
var async = require('async'); 
var fs = require('fs');
const dotenv = require('dotenv');
```

2. Configure the Api key for TAMU GeoServices.
```
dotenv.config();
const apiKey = process.env.TAMU_Key;
```

3. Read the JSON file and parse its contents into the current file.
```
var content = fs.readFileSync("Address_Attempt3.json");
content = JSON.parse(content);
```

4. Use [.eachSeries](https://caolan.github.io/async/v3/docs.html#eachSeries) in the async module to iterate over an array and operates on each item in the array in series.

```
async.eachSeries(content, function(value, callback) {
    var address = value.streetAddress;
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + address.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';
```

5. Request the contents in the body of the link by using the request module.
```
request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
```

6. Create a variable containing an object which contains the required information from the body (Street Address, Longitude, Latitude).
```
var geolocation = {
                streetaddress: tamuGeo['InputAddress'],
                latitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'],
                longitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'],
            }
```
7. Pushing the object containing Street Address, Longitude and Latitude in an empty array that we created at the begining of the file.
```
var meetingsData = [];
 meetingsData.push(geolocation);
        }
    });
    
    setTimeout(callback, 2000);  
```

8. Write a .json file containing the values of the array. 
```}, function() {
        fs.writeFileSync('Geo_Address.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log('Number of meetings in this zone: ');
        console.log(meetingsData.length);
    });
```

-------------------------------------------------
##### Output Example
```
[{"streetaddress":{"StreetAddress":"122 E 37TH ST New York NY ","City":"New York","State":"NY","Zip":""},"latitude":"40.7483929","longitude":"-73.9787906"},{"streetaddress":{"StreetAddress":"30 E 35TH ST New York NY ","City":"New York","State":"NY","Zip":""},"latitude":"40.7496221","longitude":"-73.9855348"}]
```

--------------------------------------------------
##### Issues and Errors

1. I had to redo the file extracting addresses in order to parse the exact addresses. However, I could not parse the zipcodes for any files. 
