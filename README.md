# sudoku
Simple Sudoku puzzle generator, solver, and display in JavaScript.

Sudoku puzzles require you to place the digits 1 through 9 in cells so that each digit appears only once in each row, only once in each column, and only once in each 3x3 boxed area.

On this page, cells with value zero are empty - your goal is to replace all of the empty (zero) cells with valid numbers. Click on a light-grey cell to cycle through the digit values.

If hints are turned on, then all cells that only have one possible value are highlighted in green, while rows that have an invalid values are highlighted in red. Note that the hints are updated based on the values that you have entered, not based on the actual solution.

![example](https://raw.githubusercontent.com/dmackinnon1/sudoku/master/imgs/example.png)

Try out a live version at https://dmackinnon1.github.io/sudoku/.

## daily Sudoku folder
The folder /dailySudoku contains LaTex source files for printable daily puzzles. If no puzzle exists for today, you can create one in this repo by running the `build daily puzzle LaTeX` GitHub action.
