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

    var isHorizantal = selectedShip.isHorizantal;
    if(selectedShip==null){
        for(var i=0;i<this.ships.length;i++){
            var tempSelectedShip = this.ships[i];
            if(tempSelectedShip.isPlaced){
                this.clearPositions(tempSelectedShip);
                tempSelectedShip.removeShip();
            }
        }
    } 

    else if(this.validPlacement(x,y,selectedShip)){
        for(var i=0;i<selectedShip.size;i++){
            this.board[x+(i*isHorizantal)][y+(i*(!isHorizantal))] = this.CONST_SHIP;
        }
        this.clearPositions(selectedShip);
        selectedShip.setPosition(x,y);
        this.placedShips += 1;
    }

    else if(selectedShip.validRemove(x,y)){
        this.clearPositions(selectedShip);
        selectedShip.removeShip();
    }

}


BattleshipModel.prototype.computerGeneratePositions = function(){
    //Clear all placed ships
    for(var i=0;i<this.ships.length;i++){
        var tempSelectedShip = this.ships[i];
        if(tempSelectedShip.isPlaced){
            this.clearPositions(tempSelectedShip);
            tempSelectedShip.removeShip();
        }
    }


    //Iterate until all ships are placed

    for(var i=0;i<this.ships.length;i++){
        var selectedShip = this.ships[i]
        selectedShip.isHorizantal = this.randomBoolean();
        while(!selectedShip.isPlaced){
            var x = Math.floor(Math.random() * (this.board.length-1))
            var y = Math.floor(Math.random() * (this.board.length-1))
            this.placeShip(x,y,selectedShip);
        }
    }
}

BattleshipModel.prototype.randomBoolean = function(){
    var val = Math.round(Math.random())
    if (val>0){
        return false;
    }
    return true;
}

BattleshipModel.prototype.clearPositions = function(selectedShip){
    var array = selectedShip.getPosition();

    for(var i=0;i<array.length;i++){
        if(selectedShip.isPlaced){
        this.board[array[i][0]][array[i][1]] = this.CONST_EMPTY;
        }
    }

    if(selectedShip.isPlaced){
        this.placedShips -= 1;
    }
}


BattleshipModel.prototype.gameOver = function(){
    for(var i=0;i<this.ships.length;i++){
        if(!this.ships[i].isSunken){
            return false;
        }
    }
    return true;
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
        var selectedShip = this.getSelectedShip(x,y);
        selectedShip.hit(x,y);
        if(selectedShip.checkIfSunken()){
            alert("YOU SUNK A "+selectedShip.name+"!!!!!");
            this.sunkenShips += 1;
        }
        else{
            alert("HIT! You hit a "+selectedShip.name);
        }
        this.totalShots += 1;
        if(this.gameOver()){
            alert("You won! You sank all the ships with "+this.totalShots+" shots");
        }
    }
}

BattleshipModel.prototype.validPlacement = function(x,y,selectedShip){
    var isHorizantal = selectedShip.isHorizantal;
    var size = selectedShip.size;
    if((x+size*isHorizantal)>this.board.length || (y+size*(!isHorizantal))>this.board.length){
        return false;
    }
    for(var i=0;i<size;i++){
        if(this.hasShip((x+i*isHorizantal),(y+i*(!isHorizantal)))){
            return false;
        }
    }
    return true;
}

BattleshipModel.prototype.allShipsPlaced = function(){
    for(var i=0;i<this.ships.length;i++){
        if(!this.ships[i].isPlaced){
            return false;
        }
    }
    return true;
}


BattleshipModel.prototype.getSelectedShip = function(x,y){
    for(var i=0;i<this.ships.length;i++){
        if(this.ships[i].validRemove(x,y)){
            return this.ships[i];
        }
    }
    return null;
}



function ShipModel(size,name) {

    this.size = size;
    this.name = name;
    this.isPlaced = false;
    this.isHorizantal = true;
    this.isSunken = false;

    //The array takes in [x,y,hit], the "hit" is either false when not hit and true when hit
    this.position = new Array()

    for(var i = 0;i<this.size;i++){
        this.position.push([null,null,false]);
    }

}

ShipModel.prototype.setPosition = function(x,y){
    for(var i = 0;i<this.size;i++){
        this.position[i][0] = (x+(i*this.isHorizantal));
        this.position[i][1] = (y+(i*(!this.isHorizantal)));
    }
    this.isPlaced = true;
}

ShipModel.prototype.removeShip = function(x,y){
    if(this.validRemove(x,y)){
        for(var i = 0;i<this.size;i++){
            this.position[i][0] = null;
            this.position[i][1] = null;
        }
    }
    this.isPlaced = false;
}


ShipModel.prototype.validRemove = function(x,y){
    for(var i = 0;i<this.size;i++){
        if(this.position[i][0]==x && this.position[i][1] == y){
            return true;
        }
    }
    return false;
}

ShipModel.prototype.hit = function(x,y){
    for(var i = 0;i<this.size;i++){
        if(this.position[i][0]==x && this.position[i][1] == y){
            this.position[i][2] = true;
        }
    }
}


ShipModel.prototype.getPosition = function(){
    return this.position;
}

ShipModel.prototype.checkIfSunken = function(){
    for(var i = 0;i<this.size;i++){
        if(this.position[i][2] == false){
            return false;
        }
    }
    this.isSunken = true;
    return true;
}

















