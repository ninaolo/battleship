// Whole-script strict mode syntax
"use strict";

var BattleshipBoard = function(size) {

    this.board = new Array(size);

    for (var row = 0; row < size; row++) {
        this.board[row] = new Array(size);
        for (var col = 0; col < size; col++) {
            this.board[row][col] = 0;
        }
    }


}