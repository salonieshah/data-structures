// dependencies
const dotenv = require('dotenv'); //npm install dotenv
// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_Key;
console.log(apiKey);
