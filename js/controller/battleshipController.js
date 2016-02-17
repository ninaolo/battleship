// Whole-script strict mode syntax
"use strict";

function BattleshipController(battleshipView, battleshipModel) {

    this.battleshipModel = battleshipModel;
    this.battleshipView = battleshipView;
    this.shooting = false;
    this.setEventListeners();

}

BattleshipController.prototype.setEventListeners = function() {

    for(var i = 0; i < this.battleshipView.gridButtons.length; i++) {
        $(this.battleshipView.gridButtons[i]).on("click", this.gridClick.bind(this));
    }

    $(this.battleshipView.startButton).on("click", this.startGame.bind(this));
}

BattleshipController.prototype.gridClick = function(e) {
    if (this.shooting) {
        alert("shoot!");
    } else {
        this.placeShip(e);
    }
}

BattleshipController.prototype.placeShip = function(e) {
    var x = parseInt(e.target.getAttribute('data-x'));
    var y = parseInt(e.target.getAttribute('data-y'));
    //alert("X:" + x + " Y:" + y);
    this.battleshipModel.placeShip(x, y);
    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard();
}

BattleshipController.prototype.startGame = function() {
    this.shooting = true;
    this.battleshipView.updateGrid(this.shooting);

}