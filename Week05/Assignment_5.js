// Saloni Shah
// Data Structure: Assignment 03 
// Date: 21 September 2019

//Lets Get Started
// 1. Create dependencies and configure
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";
    // console.log (AWS);
var async = require('async');

// 2. Connect to dynamodb
var dynamodb = new AWS.DynamoDB();

// 3. Create an empty array to push blog entry items
var blogEntries = [];

// 4. Create categories and declare data types
class BlogEntry {
    constructor(category, date, content, mood, food, activity, gratefulFor) {
        this.category = {}; //Category Partition Key
        this.category.S = category;
        this.date = {}; //Time Created Sort Key
        this.date.S = new Date(date).toDateString();
        this.content = {}; // What's on your mind?
        this.content.S = content;
        this.mood = {}; // How are you feeling?
        this.mood.S = mood;
        this.food = {}; // What did you eat?
        this.food.S = food;
        this.activity = {}; // What did you do?
        this.activity.S = activity;
        this.gratefulFor = {}; // What are you grateful for?
        this.gratefulFor.S = gratefulFor;
    }
  }

// 5. Push items in the empty array
blogEntries.push(new BlogEntry
                    ('India', //based on locations
                    '3 August 2019 00:30', // Is equivalent to 3 Aug 2019 at 00:30 EDT (07:00pm UTC)
                    "Taking an international flight. I would miss my family and friends. I hope it's worth it.", 
                    'Sad', 
                    'Indian food', 
                    'Packing, Meeting', 
                    'Best Family, Great Friends, Financial Help', 
                    )
                );
                

blogEntries.push(new BlogEntry
                    ('New York', //based on locations
                    '4 August 2019 19:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    "It's my first day outside India, in the first sight America looks beautiful.", 
                    'Excited', 
                    'Indian food', 
                    'Travel and Sleep', 
                    'Good flight, Good Room, Great Support System', 
                    )
                );
                
blogEntries.push(new BlogEntry
                    ('New York', //based on locations
                    '6 August 2019 20:00', // Is equivalent to 4 Aug 2019 at 19:00 EDT (11:00pm UTC)
                    "I went to my school. It looks like a five star hotel. New York is beautiful", 
                    'Happy', 
                    'Chipotle', 
                    'Explore City', 
                    'Good Food, Good Weather, Public Transport', 
                    )
                );

    // console.log(blogEntries);   

// 6. Create a for loop to push all the items in the array
var params = {};
var i = 0 ;
    for (i=0; i < blogEntries.length; i++){
        params.Item += blogEntries[i];  
        }
params.TableName = "processblog";

    // dynamodb.putItem(params, function (err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else console.log(data); // successful response
    //     setTimeout(data, 2000);
    // });
// console.log(params);

// 7. Use .eachSeries to console log errors and set timeout
async.eachSeries(blogEntries, function(value, callback) {
    params.Item = value;
    dynamodb.putItem(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
    
setTimeout(callback, 2000);
}); 