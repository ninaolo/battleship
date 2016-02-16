// Whole-script strict mode syntax
"use strict";

function BattleshipController(playerGrid, board) {



    this.board = board;
    this.playerGrid = playerGrid;
    this.hej = "hej";

    for(var i = 0; i < playerGrid.gridButtons.length; i++) {
        playerGrid.gridButtons.eq(i).click(this.placeShip);
    }

    this.placeShip();

}

BattleshipController.prototype.placeShip = function() {
    var x = $(this).data("x");
    //var y = $(this).data("y");
    //alert("X:" + x + " Y:" + y);
    alert(this.hej);
    this.board.placeShip(x, y);
    this.playerGrid.updateGrid();
}
