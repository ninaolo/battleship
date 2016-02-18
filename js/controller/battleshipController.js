// Whole-script strict mode syntax
"use strict";

function BattleshipController(battleshipView, battleshipModel) {

    this.battleshipModel = battleshipModel;
    this.battleshipView = battleshipView;
    this.shooting = false;
    this.selectedShip = null;
    this.setEventListeners();

}

BattleshipController.prototype.setEventListeners = function() {

    for(var i = 0; i < this.battleshipView.gridButtons.length; i++) {
        $(this.battleshipView.gridButtons[i]).on("click", this.gridClick.bind(this));
        $(this.battleshipView.gridButtons[i]).on("mouseenter", this.hoverEffect.bind(this));
        $(this.battleshipView.gridButtons[i]).on("mouseleave", this.hoverEffect.bind(this));
    }

    $(this.battleshipView.startButton).on("click", this.startGame.bind(this));

    for(var i = 0; i < this.battleshipView.shipButtons.length; i++) {
        $(this.battleshipView.shipButtons[i]).on("click", this.selectShip.bind(this));
    }
}


BattleshipController.prototype.selectShip = function(e) {
    var shipID = e.target.getAttribute('data-shipID');
    this.selectedShip = this.battleshipModel.ships[shipID];
}

BattleshipController.prototype.gridClick = function(e) {
    var x = parseInt(e.target.getAttribute('data-x'));
    var y = parseInt(e.target.getAttribute('data-y'));
    if (this.shooting) {
        this.shoot(x, y);
    } else {
        this.placeShip(x, y);
    }
}

BattleshipController.prototype.hoverEffect = function(e) {
    if (this.shooting == false) {
        if (!(this.selectedShip == null)) {
            var x = parseInt(e.target.getAttribute('data-x'));
            var y = parseInt(e.target.getAttribute('data-y'));
            for (var i = 0; i < this.selectedShip.size; i++) {
                $("[data-x=" + (x+i) + "][data-y=" + y + "]").toggleClass("active");
            }
        }
    }
}

BattleshipController.prototype.placeShip = function(x, y) {
    this.battleshipModel.placeShip(x, y, this.selectedShip);
    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard(this.shooting);
}

BattleshipController.prototype.startGame = function() {
    this.shooting = true;
    this.selectedShip = null;
    this.battleshipView.updateGrid(this.shooting);

}

BattleshipController.prototype.shoot = function(x, y) {
    this.battleshipModel.shoot(x, y);
    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard(this.shooting);
}