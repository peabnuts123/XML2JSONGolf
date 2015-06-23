"use strict";

//SETUP
//NodeJS
var fs = require('fs');
var _ = require('underscore');
var _str = require('underscore.string');

//Constants
var XML_FILE_NAME = "data.xml";
var JSON_FILE_NAME = "data.json";

//Test Data (file contents)
var XMLData = getFileContents(XML_FILE_NAME);
var JSONData = getFileContents(JSON_FILE_NAME);

//REGISTER TEST FUNCTIONS
//Variables
var convertJSONToXML = [];
var convertXMLToJSON = [];



//==============================
// <THE BIT YOU NEED TO ADD TO>
//==============================

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
	//Add more convertFunction objects here
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
	//Add more convertFunction objects here
);

//===============================
// </THE BIT YOU NEED TO ADD TO>
//===============================



//EXECUTION
runTests();

//UTILITY
//Run tests
function runTests() {
	runTest("JSON2XML", convertJSONToXML, JSONData, XMLData);
	runTest("XML2JSON", convertXMLToJSON, XMLData, JSONData);
}

function runTest(name, cfCollection, testData, expectedResult) {
	var formatWidth = 50;

	var tableDelimeter = " | ";

	var columnWidths = {
		Name : Math.ceil(0.6 * (formatWidth - 4 - (tableDelimeter.length * 2))),
		Result : Math.floor(0.2 * (formatWidth - 4 - (tableDelimeter.length * 2)))
	};
	columnWidths.Score =  formatWidth - 4 - columnWidths.Name - columnWidths.Result - (tableDelimeter.length * 2);

	console.log("  ==" + centeredString(name, formatWidth - 8) + "==  ");
	console.log("  ==" + centeredString("Total Functions: " + cfCollection.length, formatWidth - 8) + "==  ");

	var tableFormatString = "  %-" + columnWidths.Name + "s" + tableDelimeter + "%" + columnWidths.Result + "s" + tableDelimeter + "%" + columnWidths.Score + "s  ";
	console.log(_str.sprintf(tableFormatString, "Name", "Result", "Score"));
	console.log('  ' + new Array(formatWidth + 1 - 4).join('=') + '  ');

	var results = _.map(cfCollection, function(cf) {
		return {
			name: cf.name,
			result: cf.f(testData) === expectedResult,
			score: cf.score()
		};
	});

	var sortedResults = _.sortBy(results, function(cf) {
		if (cf.result) {
			return cf.score;
		} else {
			return 100000 + cf.score;
		}
	});

	_.each(sortedResults, function(cf) {
		var result = cf.result;
		var resultText = result ? "Passed" : "Failed";

		var scoreText = "" + cf.score;

		console.log(_str.sprintf("  %-" + columnWidths.Name + "s" + tableDelimeter + "%" + columnWidths.Result + "s" + tableDelimeter + "%" + columnWidths.Score + "s", cf.name, resultText, scoreText));
	});

	console.log("");
}

//Create a string that is centered in a string of a certain width
function centeredString(s, width) {
	var centeringSpaceLeft = (Math.ceil((width - s.length - 2)/2));
	var centeringSpaceRight = (Math.floor((width - s.length - 2)/2));

	return _str.sprintf("%s %s %s", new Array(centeringSpaceLeft+1).join('-'), s, new Array(centeringSpaceRight+1).join('-'));
}

//Create object that holds a name and a function
function convertFunction(name, f) {
	this.name = name;
	this.f = f;
	this.score = function() {
		return this.f.toString().replace(/^[^{]*{([\s\S]*)}.*$/gm, "$1").replace(/\s{2,}/gm," ").trim().length;
	}
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