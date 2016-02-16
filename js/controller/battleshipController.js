// Whole-script strict mode syntax
"use strict";

function BattleshipController(playerGrid, board) {

    this.board = board;
    this.playerGrid = playerGrid;
    this.hej = "hej";

    for(var i = 0; i < playerGrid.gridButtons.length; i++) {
        playerGrid.gridButtons[i].addEventListener("click", this.placeShip.bind(this), false);
    }
}

BattleshipController.prototype.placeShip = function(e) {
    //var x = $(this).data("x");
    //var y = $(this).data("y");
    var x = parseInt(e.target.getAttribute('data-x'), 10);
    var y = parseInt(e.target.getAttribute('data-y'), 10);
    alert("X:" + x + " Y:" + y);
    this.board.placeShip(x, y);
    this.playerGrid.updateGrid();
}
