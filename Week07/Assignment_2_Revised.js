// Saloni Shah
// Data Structure: Assignment 07 
// Date: 05 October 2019
//Location Table
//Contents: ID, Zone, StreetAdress, City, State, Zipcode, Latitude, Longitude

//Lets Get Started
// 1. Create two dependencies i.e. pg and dotenv
var fs = require('fs');
var cheerio = require('cheerio');

// 2. Load the meetings text file into a variable content
var content = fs.readFileSync('Text05.txt');
//console.log(content);
          
// 3.Load `content` into cheerio object
var $ = cheerio.load(content);
    
//4. Create an empty array
var locationData =[];

//Contents:Zone, StreetAdress, City, State, Zipcode

//5. Find the elements of a particular style which belongs to address and push it into array. 
$('td').each(function(i, elem) {
    if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px'){
//Zone, Street Address, City, State, Zipcode
        var thisLocation = {};
        thisLocation.zone = '05';
        thisLocation.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0].split('(')[0];
        thisLocation.city = 'New York';
        thisLocation.state = 'NY';
        thisLocation.zipcode = $(elem).html().split('<br>')[3].trim().substr(- 5);
        locationData.push(thisLocation);
    }
});

//Meeting name, Start time, End time, Meeting day, Meeting type   

$('td').each(function(i, elem) {
    var thisMeeting = {};
    if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px'){
        thisMeeting.meetingName = $(elem).html().split('<br>')[1].split('-')[0].trim().split('(')[0]; //Last entry
        locationData.push(thisMeeting);
    }
});

// $('tr').each(function(j, trElem) {
//     let id = j;
//     $(trElem).children().each(function(i,elem) {
//         var thisMeetingDetail = {};
//         if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3;width:350px;'){
//             thisMeetingDetail.meetingDay = cleanText($(elem).html()).split('<br> <br>');
//             thisMeetingDetail.id = j;
//             //.split('<br>');
//             //.bold();
//         //    [3];
//             //.split('<b>');
//             //.split('<br>')[1].split('-')[0].trim().split('(')[0]; //Last entry
//             locationData.push(thisMeetingDetail);
//         }
//     })
    
// });


//6. Print address in console
function printIt () {
    console.log(locationData);
}
setTimeout(printIt,1000);

function cleanText(txt) {
  return txt.replace(/\s\s+/g, ' ').trim();
}

// //7. Create a json
// fs.writeFileSync('Assignment_2_Revised.json', JSON.stringify(locationData));








