## Data Structure<br/>
# Final Assignment<br/>
---------------------------------------------------
#### Assignment Date: 20th November 2019<br/>
#### Assignment Due: 16th December 2019 <br/>
--------------------------------------------------
### Alcoholics Anonymous Meetings<br/>

Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_1.md) <br/>
This project was a process of series of assignments mentioned below.<br/>

1. Parsing the Data<br/>
Initially I parsed the data from 10 different pages containing the AA meetings for different zones in New York. An example of parsing one of the page can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week01) I followed the same process to parse all the pages.<br/>
<br/>
2. Cleaning the Data<br/>
The parsed data was inconsistent and difficult to manipulate. Hence, I decided to clean the data and create a json for all the cleaned addresses and meetings. An example of cleaning one of the page can be seen [here](https://github.com/salonieshah/data-structures/tree/master/Week02) <br/>
<br/>
3. Geocoding the Address</br>
I used [TAMU Geo Services](https://geoservices.tamu.edu/) to Geocode each address of the json. An example of geocoding one of the page can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week03). The end json was pushing into an array of objects containing each adress and its meeting details.</br>
<br/>
4. Creating a SQL database</br>
I decided to create one SQL table to reduce vulnerabilities. I created one table containing city zone, address, city, state, zipcode, logitude, latitude, meeting name, meeting start time, meeting end time, meeting day, meeting type and accessibility.An example of the SQL database can be seen [here.](https://github.com/salonieshah/data-structures/tree/master/Week07).</br>
<br/>
5. User Interface Design </br>
I conceptualized a design for an Interface of the AA meetings. The sketch could be seen [here.](https://github.com/salonieshah/data-structures/blob/master/Week11/Images/AA_Meetings/AA_Meeting_Interface-02.jpg)</br>
<br/>
6. Connecting Front-end Design to Back-end Database </br>
I created app using AWS. The code can be seen [here](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/app.js), while the styling can be referred [here](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/public/aa-styles.css).</br>
I used [Leaflet](https://leafletjs.com/reference-1.6.0.html) to create the base map. To create each marker for the meeting. I created an html file inside the script to generate dynamic html accoring to the query.</br>
<br/>
7. Creating Query</br>
I intended to create an app that queries all the meeting in the next 24 hours. It updates user everyday regarding meetings for all locations instead of all the meetings at once. The user has liberty to choose different location as per the convenience. The app tries not to overwhelm the user and respects the privacy of the user.</br>
I used [Moment Timezone](https://momentjs.com/timezone/) to create a string for the current time. As my time was in 12 hour format in the database, I had to create parameter that considered AM and PM as part of the query. 
```
        if (ampm == "AM"){ var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', city, 'city', meeting_start_time, 'ti', meeting_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
                FROM aaData
                WHERE (Meeting_Day = '` + today + "' and meeting_start_time >= '" + current_time + 
                                    "' and meeting_time = '" + ampm +   
                `')
                OR (Meeting_Day = '` + today + "' and meeting_time = 'PM"+ `')
                OR (Meeting_Day = '` + tommorow + "' and meeting_start_time <= '" + current_time + 
                                    "' and meeting_time = '" + ampm +   
                `')
                GROUP BY latitude, longitude, zone;`;   
                
        } else if (ampm == "PM")
                { var thisQuery = `SELECT latitude, longitude, zone, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'ti', meeting_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
                    FROM aaData
                    WHERE (Meeting_Day = '` + today + "' and meeting_start_time >= '" + current_time + 
                                        "' and meeting_time = '" + ampm +   
                    `')
                    OR (Meeting_Day = '` + today + "' and meeting_time = 'AM"+ `')
                    OR (Meeting_Day = '` + tommorow + "' and meeting_start_time <= '" + current_time + 
                                        "' and meeting_time = '" + ampm +   
                `')
                GROUP BY latitude, longitude, zone;`;   
        }
```
This query finds the matching meeting and displays the markers and the inforamation on the map. <br/>
<br/>
Due to limitation of time, I could not reach the desired user - interface design. however, after the deadline I would improve on the code and the query of my current design. <br/>

