// Whole-script strict mode syntax
"use strict";

function BattleshipModel(size) {

    this.size = size;
    this.board = new Array(this.size);

    this.placedShips = 0;
    this.sunkenShips = 0;
    this.totalShots = 0;

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
BattleshipModel.prototype.placeShip = function(x, y) {
    this.board[x][y] *= (-1);
    if (this.board[x][y] == -1) {
        this.placedShips += 1;
    } else {
        this.placedShips -= 1;
    }

}
