// Saloni Shah
// Data Structure: Assignment 09 
// Date: 1 November 2019

//Lets Get Started
// 1. Create for dependencies i.e. pg, request
var request = require('request');
const { Client } = require('pg');

// 2. Creating Variables for accessing Photon Particle
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'tempsensor';
//var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;
var device_url = 'https://api.particle.io/v1/devices/1e0042000d47373334323233/tempsensor?access_token=b3e319bd8505dbac17ec8467fff0129ddda5bba3';

//3. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'salonieshah';
db_credentials.host = 'data-structures.c0wrpagx3mr8.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//4. Creating a function that documents the temperature data by requesting information from URL and storing it in a variable
var tempData = function() {
    request(device_url, function(error, response, body) {
        var data = JSON.parse(body).result;
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO tempsensor VALUES (" + data + ", DEFAULT);";
        console.log(thisQuery);
        
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

//5. Create a new row after every five minutes
setInterval(tempData, 300000);
