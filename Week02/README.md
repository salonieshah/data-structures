## Data Structure
# Week 02
---------------------------------------------------
Assignment Date: 4th September 2019<br/>
Assignment Due: 9th September 2019 <br/>
Assignment Details can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md) <br/>

I made two attempts to extract the addresses for the textfile05. <br/>

### Attempt 1
--------------------------------------------------
1.Create two dependencies Cheerio and File Server. <br/>
The Node.js file system module allows you to work with the file system on your system. <br/>
a. I used fs-cheerio as it allows to read and write files to/from cheerio objects. <br/>
b. To include the File System module, I use the require() method.<br/>

2.Use [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) to get data from the text file Text05. <br/>
The try...catch statement marks a block of statements to try, and specifies a response, should an exception be thrown. <br/>

3. [Load](https://www.npmjs.com/package/cheerio#loading) `content` into a cheerio object <br/>
With Cheerio, we need to pass in the HTML document. <br/>

4. Get all indivisual addresses excluding the excess information<br/>
a. To select my variable, I navigated to grandchild of the tr to target the addresses. <br/>
b. Then I used [.each](https://www.npmjs.com/package/cheerio#each-functionindex-element-) to execute the function for each matched element. <br/>
c. The command _text(this).find('span').remove().html()_ refers to finding 'span' from the current element of the HTML document file and removing it. <br/>

5. Created a variable to contain an array of the addresses <br/>

6. Create a text file named Address_Attempt1.txt containing the location name and address <br/>
(*Doubt*)<br/>

7. Used [writeFileSync](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback) to create a text file containing all the addresses. <br/>

### Attempt 2 <br/>
--------------------------------------------------

Most of the commands I used were similar to the first Attempt except the ones mentioned below.

2. Use [fs.readFileSync](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options) function to get string data from the text file Text05. <br/>
5. Created a variable to contain string of the addresses <br/>

###  Issues and Errors

1. I had tried multiple commands for targeting and removing unnecessary information from the string/array, but it didn't workout. </br>
2. I also tried to add line breaks after comma (,) and hyphen (-) by using split, but it also had several errors. 

