// Saloni Shah
// Data Structure: Assignment 06 
// Date: 09 October 2019

//Lets Get Started
// 1. Create dependencies and configure
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

// 2. Connect to dynamodb
var dynamodb = new AWS.DynamoDB();

//3.  Sample statement to blog entries from 'New York' category between 'August 1 2019' and 'September 1 2019' 
var params = {
    TableName : "blog",
     KeyConditionExpression: "category = :categoryName and created between :minDate and :maxDate", // the query expression
    ExpressionAttributeValues: { // the query values
        ":categoryName": {S: "Concepts"},
        ":minDate": {S: new Date("August 1, 2019").toLocaleString()},
        ":maxDate": {S: new Date("September 1, 2019").toLocaleString()},
    }
};


dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});

