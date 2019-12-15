## Data Structure<br/>
# Final Assignment 2 <br/>
---------------------------------------------------
#### Assignment Date: 20th November 2019<br/>
#### Assignment Due: 16th December 2019 <br/>
--------------------------------------------------
### Process Blog <br/>

Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/final_assignment_2.md) <br/>
This project was a process of series of assignments mentioned below.<br/>

1. Setup and Preparation<br/>
I am using Amazon DynamoDB, a NoSQL database service to create a table. Following are details of my table.<br/>
Table Name: blog <br/>
Primary Key: Category <br/>
Datatype of Primary Key: String <br/>
Sort Key: date <br/>
Datatype of Sort Key: String <br/>

2. Design a Data Model <br/>
I used denormalised data model and designed a single table that includes an idea for the things I wanted to document in my environmental blog. I included category, date, number, title, content, keyword, source for the database. <br/>

3. Connecting Front-end Design to Back-end Database </br>
I created app using AWS. The code for [query](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/app.js), 
[handlebars](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/blog-handlebars.html), 
[html](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/public/blog.html), 
[css](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/public/blog-styles.css), 
[jquery](https://github.com/salonieshah/data-structures/blob/master/Final_Assignment/public/blog.js) 
the following are linked with respective links. <br/>
The app creates a default view of all the blogs. The user can sort the blogs by categories to dive-in into specific subjects. The query for the blog is shown below. <br/>
```
if (category != 'all'){
            var params = {
                TableName : "blog",
                KeyConditionExpression: "category = :categoryName and created between :minDate and :maxDate", // the query expression
                ExpressionAttributeValues: { // the query values
                    ":categoryName": {S: category},
                    ":minDate": {S: new Date(minDate).toISOString()},
                    ":maxDate": {S: new Date(maxDate).toISOString()},
                }
            };
            
            dynamodb.query(params, onScan)

        } else {
            var params = {
                TableName: "blog",
                ProjectionExpression: "created, category, content, title",
                FilterExpression: "created between :minDate and :maxDate",
                 ExpressionAttributeValues: { // the query values
                    ":minDate": {S: new Date(minDate).toISOString()},
                    ":maxDate": {S: new Date(maxDate).toISOString()}
                }
            };
            
            dynamodb.scan(params, onScan)

        }
```
Each time user updates the category using the dropdown menu, the results are updated using jquery script. The handlebars file updates the contents of each entry of the resulted query. <br/>
Due to limitation of time, I could not reach the desired user - interface design. however, after the deadline I would improve on the code and the query of my current design. <br/>


