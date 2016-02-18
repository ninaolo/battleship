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


    this.ships = new Array();
    this.ships.push(new ShipModel(5,"Aircraft carrier"));
    this.ships.push(new ShipModel(4,"Battleship"));
    this.ships.push(new ShipModel(3,"Submarine"));
    this.ships.push(new ShipModel(3,"Cruiser"));
    this.ships.push(new ShipModel(2,"Destroyer"));
}

BattleshipModel.prototype.placeShip = function(x, y,selectedShip) {

    if(selectedShip==null){
        for(var i=0;i<this.ships.length;i++){
            var tempSelectedShip = this.ships[i];
            if(tempSelectedShip.validRemove(x,y)){
                this.clearPositions(tempSelectedShip.getPosition());
                tempSelectedShip.removeShip();
            }
        }
    }

    if(this.validPlacement(x,y,selectedShip.size)){
        for(var i=0;i<selectedShip.size;i++){
            this.board[x+i][y] = this.CONST_SHIP;
        }
        this.clearPositions(selectedShip.getPosition(x,y));
        selectedShip.setPosition(x,y);
        this.placedShips += 1;
    }
}

BattleshipModel.prototype.clearPositions = function(array){
    for(var i=0;i<array.length;i++){
        if(array[i][0]!=null&&array[i][1]!=null){
        this.board[array[i][0]][array[i][1]] = this.CONST_EMPTY;
        }
    }
    this.placedShips -= 1;
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

BattleshipModel.prototype.validPlacement = function(x,y,size){
    for(var i=0;i<size;i++){
        if(this.hasShip(x+i, y)){
            return false;
        }
    return true;
}
}





function ShipModel(size,name) {

    this.size = size;
    this.name = name;
    this.placed = false;

    this.position = new Array()
    for(var i = 0;i<this.size;i++){
        this.position.push([null,null]);
    }

}

ShipModel.prototype.setPosition = function(x,y){
    for(var i = 0;i<this.size;i++){
        this.position[i][0] = (x+i);
        this.position[i][1] = y;
    }
}

ShipModel.prototype.removeShip = function(x,y){
    if(this.validRemove(x,y)){
        for(var i = 0;i<this.size;i++){
            this.position[i][0] = null;
            this.position[i][1] = null;
        }
    }
}


ShipModel.prototype.validRemove = function(x,y){
    for(var i = 0;i<this.size;i++){
        if(this.position[i][0]==(x+i) && this.position[i][1] == y){
            return true;
        }
    }
    return false;
}

ShipModel.prototype.getPosition = function(){
    return this.position;

}

















