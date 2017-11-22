//this will demonstrate the use of callback function, how the file gets read.
var fs = require("fs");
fs.readFile('readfile.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
 });
 console.log("Program Ended"); //this will shown first and then the data will be read simultaneously.