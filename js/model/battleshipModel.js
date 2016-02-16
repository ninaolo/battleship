// Whole-script strict mode syntax
"use strict";

function BattleshipBoard(size) {

    this.board = new Array(size);

    for (var row = 0; row < size; row++) {
        this.board[row] = new Array(size);
        for (var col = 0; col < size; col++) {
            this.board[row][col] = 1;
        }
    }

}

/*
 Places a ship on the specified coordinates.
 The value 1 means it's empty and the value -1
 means it's occupied
 */
BattleshipBoard.prototype.placeShip = function(x, y) {
    this.board[x][y] *= (-1);
}