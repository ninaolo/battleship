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


    this.ships = new Array();
    this.ships.push(new ShipModel(5,"Aircraft carrier"));
    this.ships.push(new ShipModel(4,"Battleship"));
    this.ships.push(new ShipModel(3,"Submarine"));
    this.ships.push(new ShipModel(3,"Cruiser"));
    this.ships.push(new ShipModel(2,"Destroyer"));

    for (var row = 0; row < size; row++) {
        this.board[row] = new Array(size);
        for (var col = 0; col < size; col++) {
            this.board[row][col] = this.CONST_EMPTY;
        }
    }
}

BattleshipModel.prototype.placeShip = function(x, y) {

    var selectedShip = this.ships[0];
    var validPlacement = true;
    var validRemove = true;

    for(var i=0;i<selectedShip.size;i++){
        if(this.hasShip(x+i, y)){
            validPlacement = false;
        }
        if(selectedShip.position[i][0]!=(x+i) && selectedShip.position[i][1]!=y){
            validRemove = false;
        }
    }

    for(var i=0;i<selectedShip.size;i++){
        if (this.hasShip(x+i, y) && validRemove) {
            this.board[x+i][y] = this.CONST_EMPTY;
            this.placedShips -= 1;
        } 
        else if(validPlacement) {
            this.board[x+i][y] = this.CONST_SHIP;
            this.placedShips += 1;
        }
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





function ShipModel(size,name) {

    this.size = size;
    this.name = name;

    this.position = new Array()
    for(var i = 0;i<this.size;i++){
        this.position.push([null,null]);
    }

}


















