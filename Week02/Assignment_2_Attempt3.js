// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('Text05.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var meetingData =[];

// print (to the console) names of thesis students
$('td').each(function(i, elem) {
    if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px'){
        var thisMeeting = {};
        thisMeeting.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];
        thisMeeting.city = 'New York';
        thisMeeting.state = 'NY'
        meetingData.push(thisMeeting);
    }
});

function printIt () {
    console.log(meetingData);
}
setTimeout(printIt,1000)

fs.writeFileSync('Address_Attempt3.json', JSON.stringify(meetingData));