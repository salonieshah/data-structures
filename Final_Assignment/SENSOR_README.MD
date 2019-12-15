## Data Structure<br/>
# Final Assignment 3 <br/>
---------------------------------------------------
#### Assignment Date: 20th November 2019<br/>
#### Assignment Due: 16th December 2019 <br/>
--------------------------------------------------
### Temperature Sensor <br/>

Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_3.md) <br/>
This project was a process of series of assignments mentioned below.<br/>

1. Sensor <br/>
I used [Photon Particle](https://docs.particle.io/quickstart/photon/) for this assignment. I have placed the sensor in the room which has heating pipe that heats my house. I am trying to document that the ammount of heat, my house emits in order to keep interior spaces warm. </br>
<br/>

2. Create a table with PostgreSQL<br/>
I used PostGres database to store the values of temperature every 2 minutes. I was documenting the temperature and time.<br/>
<br/>

3. PM2 Runtime<br/>
I used PM2 instance to run the sensor documentation 24 X 7.<br/>
<br/>

4. Query contents of the table<br/>
I created a temporary table that creates average temperature for each hour of the day. As the timezone in the table was Universal Time Zone, the query rewrites the time as per Eastern Time.
The query is shown below.
```
var sensordata_query = `WITH newSensorData as (SELECT time - INTERVAL '5 hours' as estTime, * FROM tempsensor)
                        SELECT
                            EXTRACT (MONTH FROM estTime) as sensorMonth,
                            EXTRACT (DAY FROM estTime) as sensorDay,
                            EXTRACT (HOUR FROM estTime) as sensorHour,
                            AVG (temperature::int) as temperature
                            FROM newSensorData
                            GROUP BY sensorMonth, sensorDay, sensorHour
                            ORDER BY sensorMonth, sensorDay, sensorHour;`;
```
5. Connecting Front-end Design to Back-end Database </br>
I designed a heat map, with X axis as the time of the day and Y axis as the date. Each circle in the map represents the average value to the that hour. The colour of the circle represents the temperature. As the colour get darker, the temperature gets warmer. <br/>
The user can look at the data of each month by using the buttons on the top. <br/>
<br/>
6. Final Submission<br/>

![image](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/images/Sensor_1.JPG)<br/>
![image](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/images/Sensor_2.JPG)<br/>
![image](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/images/Sensor_3.JPG)<br
<br/>
Due to limitation of time, I could not reach the desired user - interface design. however, after the deadline I would improve on the code and the query of my current design. <br/>
