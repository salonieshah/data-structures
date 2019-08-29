// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

var urls = ['https://parsons.nyc/aa/m01.html',  
    'https://parsons.nyc/aa/m02.html',
    'https://parsons.nyc/aa/m03.html',
    'https://parsons.nyc/aa/m04.html',
    'https://parsons.nyc/aa/m05.html',
    'https://parsons.nyc/aa/m06.html',
    'https://parsons.nyc/aa/m07.html',
    'https://parsons.nyc/aa/m08.html',
    'https://parsons.nyc/aa/m09.html',
    'https://parsons.nyc/aa/m10.html'];

var fns = [ '/home/ec2-user/environment//week01/data/m01.txt',
    '/home/ec2-user/environment/week01/data/m02.txt',
    '/home/ec2-user/environment/week01/data/m03.txt',
    '/home/ec2-user/environment/week01/data/m04.txt',
    '/home/ec2-user/environment/week01/data/m05.txt',
    '/home/ec2-user/environment/week01/data/m06.txt',
    '/home/ec2-user/environment/week01/data/m07.txt',
    '/home/ec2-user/environment/week01/data/m08.txt',
    '/home/ec2-user/environment/week01/data/m09.txt',
    '/home/ec2-user/environment/week01/data/m10.txt'];


function createtextfiles(i){
    request(urls[i], function(error, response, body){
        if (!error && response.statusCode == 200) {
        fs.writeFileSync (fns[i], body);
        }
        else {console.log("Request failed!")}
     });
}
    
for (var i=0; i<10; i++){
createtextfiles(i)    
}

//var request = new Request(urls[0]);
// fetch(urls[0]).then (function (response) {
//     return response.text();
//     }).then(function(text){
//     console.log(text.substring(0,30));
// });
    

