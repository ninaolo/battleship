// Whole-script strict mode syntax
"use strict";

function BattleshipModel(size) {

    this.size = size;
    this.board = new Array(this.size);

    this.placedShips = 0;
    this.sunkenShips = 0;
    this.totalShots = 0;

    this.CONST_EMPTY = 0;
    this.CONST_SHIP = 1;
    this.CONST_HIT = 2;
    this.CONST_MISS = 3;

    for (var row = 0; row < size; row++) {
        this.board[row] = new Array(size);
        for (var col = 0; col < size; col++) {
            this.board[row][col] = this.CONST_EMPTY;
        }
    }

}

BattleshipModel.prototype.placeShip = function(x, y) {
    if (this.hasShip(x, y)) {
        this.board[x][y] = this.CONST_EMPTY;
        this.placedShips -= 1;
    } else {
        this.board[x][y] = this.CONST_SHIP;
        this.placedShips += 1;
    }
}

BattleshipModel.prototype.hasShip = function(x, y) {
    return this.board[x][y] == this.CONST_SHIP;
}

BattleshipModel.prototype.isHit = function(x, y) {
    return this.board[x][y] == this.CONST_HIT;
}

BattleshipModel.prototype.isMiss = function(x, y) {
    return this.board[x][y] == this.CONST_MISS;
}

BattleshipModel.prototype.shoot = function(x, y) {
    if (this.board[x][y] == this.CONST_EMPTY) {
        this.board[x][y] = this.CONST_MISS;
        this.totalShots += 1;
    } else if (this.board[x][y] == this.CONST_SHIP) {
        this.board[x][y] = this.CONST_HIT;
        this.totalShots += 1;
        this.sunkenShips += 1;
    }
}
