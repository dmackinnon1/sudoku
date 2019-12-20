#!/usr/bin/env node
/*
* When run, will generate a Sudoku puzzle for the current day, update the tracking file, and 
* export the puzzle and solution to two separate LaTeX files.
* To generate for a specific date, run with string parameter specifying date > ./index.js 'July 10, 2019'
*/
const fs = require('fs');
let sudoku = require('./js/sudoku.js');
let doc = require('./js/latex-builders.js');
const dailyFilePrefix = '../dailySudoku/'
const dailyFile = dailyFilePrefix + 'daily_sudokus.json';
let puzzles = {}; 
const months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let day = new Date();
let dayProvided = process.argv[2];
if (dayProvided != undefined){
	console.log('day provided:' + dayProvided);
	day = new Date(dayProvided);
}

//load date file
try {
 	if (fs.existsSync(dailyFile)) {
    	let rawdata = fs.readFileSync(dailyFile);  
		puzzles = JSON.parse(rawdata);  
  	}
} catch(err) {
	console.error('no data file found at ' + dailyFile)
}
//add new puzzle if there is not one already
let dayString = day.getDate()  + "_" + (day.getMonth() +1) + "_" + day.getFullYear();
let dayPretty = months[day.getMonth()] + " " + day.getDate() + ", " + day.getFullYear(); 
let p = null;
if (puzzles[dayString] == undefined){
	p = sudoku.large();
	puzzles[dayString] = p.board.json(dayString)
} else {
	console.log("we have a puzzle for today already: " + puzzles[dayString].values);
	console.log("exiting");
	process.exit();
}
//save date file with new puzzle
fs.writeFile(dailyFile, JSON.stringify(puzzles), function(err) {
    if(err) {
        return console.log("There was an error writing the daily file list" + err);
        console.log("exiting");
		process.exit(1);
    }
}); 
console.log('updated puzzle data file at ' + dailyFile);
//generate the puzzle document
let docEnv = doc.defaultPackages()
	.command("pagestyle","empty",true)
	.package("sudoku").env()
	.begin("document");
docEnv.env().begin("center").command("Huge","Today's Sudoku", true);
docEnv.env().begin("center").command("Large",dayPretty, true);
docEnv.env().begin("sudoku").p(p.board.latexDisplay());
docEnv.env().begin("center").p(p.difficulty);
//write out the puzzle file
let dailyPuzzleFile = dailyFilePrefix + dayString + '_puzzle.tex';
fs.writeFile(dailyPuzzleFile, doc.build(), function(err) {
    if(err) {
        return console.log("There was an error" + err);
        console.log("exiting");
		process.exit(1);
    }
}); 
console.log('writing puzzle file at ' + dailyPuzzleFile);
//create the solution document
doc.clear();
docEnv = doc.defaultPackages()
	.command("pagestyle","empty",true)
	.package("sudoku").env()
	.begin("document");
docEnv.env().begin("center").command("Huge","Sudoku Solution", true);
docEnv.env().begin("center").command("Large",dayPretty, true);
docEnv.env().begin("sudoku").p(p.solution.latexDisplay());
//write out the solution file
let dailyAnswerFile = dailyFilePrefix + dayString + '_answer.tex';
fs.writeFile(dailyAnswerFile, doc.build(), function(err) {
    if(err) {
        return console.log("There was an error" + err);
        console.log("exiting");
		process.exit(1);
    }
}); 
console.log('writing answer file at ' + dailyAnswerFile);
