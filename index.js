#!/usr/bin/env node
var sudoku = require('./js/sudoku.js');
var doc = require('./js/latex-builders.js');

let docEnv = doc.defaultPackages()
	.command("pagestyle","empty",true)
	.package("sudoku").env()
	.begin("document");

docEnv.env().begin("center").command("Huge","Today's Sudoku", true);
docEnv.env().begin("center").command("Large","\\today", true);
docEnv.env().begin("sudoku").p(sudoku.large().latexDisplay());

const fs = require('fs');
fs.writeFile("./sudoku.tex", doc.build(), function(err) {
    if(err) {
        return console.log("There was an error" + err);
    }
}); 