// Saloni Shah
// Data Structure: Assignment 07 
// Date: 18 October 2019

//Lets Get Started
// 1. Create for dependencies i.e. request, async, fs, dotenv
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_Key;


// read json address file 
var content = fs.readFileSync('aaData.json');
content = JSON.parse(content);
// console.log(content);
// console.log(content.length);



var meetingsData = [];

async.eachSeries(content, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.locationDetails.streetAddress.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&zip=' + value.zipCode;
    apiRequest += '&format=json&version=4.01';
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            
            var geoLocation = {};
            
            geoLocation.address = tamuGeo['InputAddress']['StreetAddress'];
            geoLocation.latitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
            geoLocation.longitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
        
            value.geoLocation = geoLocation;
            
            meetingsData.push(value);
        }
    
    });
    
    setTimeout(callback, 2000);

}, function() {
    fs.writeFileSync('Assignment_7_b.json', JSON.stringify(meetingsData));
    console.log(meetingsData.length);
});
