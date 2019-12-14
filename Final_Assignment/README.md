## Data Structure<br/>
# Final Assignment<br/>
---------------------------------------------------
#### Assignment Date: 20th November 2019<br/>
#### Assignment Due: 16th December 2019 <br/>
--------------------------------------------------
### A. Alcoholics Anonymous Meetings<br/>
Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_1.md) <br/>
This project was a process of series of assignments mentioned below.<br/>
1. Parsing the Data<br/>
Initially I parsed the data from 10 different pages containing the AA meetings for different zones in New York. An example of parsing one of the page can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week01) I followed the same process to parse all the pages.<br/>
2. Cleaning the Data<br/>
The parsed data was inconsistent and difficult to manipulate. Hence, I decided to clean the data and create a json for all the cleaned addresses and meetings. An example of cleaning one of the page can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week02)
3. Geocoding the Address</br>
I used [TAMU Geo Services](https://geoservices.tamu.edu/) to Geocode each address of the json. An example of geocoding one of the page can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week03). The end json was pushing into an array of objects containing each adress and its meeting details.</br>
4. Creating a SQL database</br>
I decided to create one SQL table to reduce vulnerabilities. I created one table containing city zone, address, city, state, zipcode, logitude, latitude, meeting name, meeting start time, meeting end time, meeting day, meeting type and accessibility.An example of the SQL database can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week07).</br>
