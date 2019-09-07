//Saloni Shah
//Data Structure: Assignment 02 
//Date: 06 September 2019
// Acknowledgements: Neil Oliver, Robin Coenen

//Lets Get Started
//1. Create two dependencies Cheerio and File Server.
const cheerio = require('cheerio');
const fs = require('fs');

//2. Use try...catch to get data from the text file: Text05
    try {
          var data = fs.readFileSync('Text05.txt', 'utf8');
          console.log(data);
    } catch (err) {
        console.error(err);
    }

//3. Load `content` into a cheerio object
    var text = cheerio.load(data);


//4. Get all indivisual addresses excluding the excess information
    text('tr tr tr').each(function(i, elem) {
        
        text(this).find('span').remove().html();
        text(this).find('div').remove().html();
        text(this).find('detailsBox').remove().html();
        
    
    console.log(text(elem).children().first().text().trim());
    });
    
  
//5. Make a variable containing string of the addresses
    var parse = ''; 
    
//6. Write the text file named Address_Attempt1.txt
    text('tr tr tr').each(function(i, elem) {
            parse += (text(elem).children().first().text().trim()) + '\n';
        });
    fs.writeFileSync('Address_Attempt1.txt', parse);