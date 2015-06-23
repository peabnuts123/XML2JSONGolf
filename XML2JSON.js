"use strict";

//SETUP
//NodeJS
var fs = require('fs');
var _ = require('underscore');

//Constants
var XML_FILE_NAME = "data.xml";
var JSON_FILE_NAME = "data.json";

//Test Data (file contents)
var XMLData = getFileContents(XML_FILE_NAME);
var JSONData = getFileContents(JSON_FILE_NAME);

//Execution
runTests();


//REGISTER TEST FUNCTIONS
//JSON to XML
convertJSONToXML.push(
	new convertFunction(
		"Naive Fail",
		function (jsonString) {
			//Init empty String
			var xmlString = "";
			//Return empty String
			return xmlString;
		}
	),
	new convertFunction(
		"Naive Success",
		function (jsonString) {
			//Return the correct answer
			return XMLData;
		}
	)
);

//XML to JSON
convertXMLToJSON.push(
	new convertFunction(
		"Naive Fail",
		function (xmlString) {
			var jsonString = "";
			return jsonString;
		}
	),
	new convertFunction(
		"Naive Success",
		function (xmlString) {
			return JSONData;
		}
	)
);


//UTILITY
//Run tests
function runTests() {
	console.log(" === XML2JSON === ")
	console.log("")
	console.log(" == Total Functions: " + convertXMLToJSON.length + " == ");
}

//Create object that holds a name and a function
function convertFunction(name, f) {
	this.name = name;
	this.f = f;
}

//Helper to read data from file
function getFileContents(fileName) {
	var fileData;

	fs.readFile(fileName, 'utf8', function(err, data) {
		if (err) {
			throw err;
		}

		fileData = data;
	});

	return fileData;
}