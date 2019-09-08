//Saloni Shah
//Data Structure: Assignment 02 
//Date: 06 September 2019
// Acknowledgements: Neil Oliver, Robin Coenen

//Lets Get Started

//1. Create two dependencies Cheerio and File Server.
var fs = require('fs');
var cheerio = require('cheerio');

//2. Load the text file into a variable
var content = fs.readFileSync('Text05.txt');

//3. Load `content` into a cheerio object
var text = cheerio.load(content);

//4. Get all indivisual addresses
text('tr tr tr').each(function(i, elem) {
    console.log(text(elem).children().first().text().trim());
});

//5. Make a variable to contain a string of the addresses
var parse = ''; 

//6. Make text file containing the addresses
text('tr tr tr').each(function(i, elem) {
    parse += (text(elem).children().first().split("<br>")[2].text().trim()) + '\n';
});

//7. Parse unneccesary information
fs.writeFileSync('Address_Attempt2.txt', parse);

