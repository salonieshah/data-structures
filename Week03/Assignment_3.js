// Saloni Shah
// Data Structure: Assignment 03 
// Date: 14 September 2019
// Acknowledgements: Ryan Best 

//Lets Get Started
// 1. Create for dependencies i.e. request, async, fs, dotenv
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// 2. Get TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_Key;

// 3. Read the JSON file and parse the contents of the file. 
var content = fs.readFileSync("Address_Attempt3.json");
content = JSON.parse(content);

// 4. Created a variable to try the code on just the first object.
// var content_test = [];
// content_test.push(content[0]);

// 5. Created an empty array 
var meetingsData = [];

// 6. Use .eachSeries in the async module to iterate over an array and operate on each item in the array in series
async.eachSeries(content, function(value, callback) {
    var address = value.streetAddress;
    // console.log(address)
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + address.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';
        console.log(apiRequest);

// 7. Requesting the contents in the body of the link by using the request.   
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            // console.log(tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude']);

// 8. Create a variable containing an object which contains the required information from the body (Street Address, Longitude, Latitude)          
            var geolocation = {
                streetaddress: tamuGeo['InputAddress'],
                latitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'],
                longitude: tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'],
            }
            // console.log(geolocation);
            
// 9. Pushing the object in the empty array that we created at the begining of the file           
            meetingsData.push(geolocation);
        }
    });
    
    setTimeout(callback, 2000);
    
// 10. Write a .json file containing the values of the array.     
    }, function() {
        fs.writeFileSync('Geo_Address.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log('Number of meetings in this zone: ');
        console.log(meetingsData.length);
    });