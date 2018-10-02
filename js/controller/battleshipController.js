// Whole-script strict mode syntax
"use strict";

function BattleshipController(battleshipView, battleshipModel) {

    this.battleshipModel = battleshipModel;
    this.battleshipView = battleshipView;
    this.shooting = false;
    this.selectedShip = null;
    this.setEventListeners();
    this.playerID = 1;
    this.playerVsComputer = false;
    $('#playerText').html("PLAYER " + this.playerID);


}

BattleshipController.prototype.setEventListeners = function () {

    for (var i = 0; i < this.battleshipView.gridButtons.length; i++) {
        $(this.battleshipView.gridButtons[i]).on("click", this.gridClick.bind(this));
        $(this.battleshipView.gridButtons[i]).on("mouseenter", this.hoverEffect.bind(this));
        $(this.battleshipView.gridButtons[i]).on("mouseleave", this.hoverEffect.bind(this));
    }

    $(this.battleshipView.startButton).on("click", this.startGame.bind(this));
    $(this.battleshipView.endButton).on("click", this.endGame.bind(this));
    $(this.battleshipView.alignmentButton).on("click", this.changeDirection.bind(this));
    $(this.battleshipView.computerGenerate).on("click", this.generatePositions.bind(this));

    for (var i = 0; i < this.battleshipView.shipButtons.length; i++) {
        $(this.battleshipView.shipButtons[i]).on("click", this.selectShip.bind(this));
    }
}


BattleshipController.prototype.selectShip = function (e) {
    var shipID = e.target.getAttribute('data-shipID');
    this.selectedShip = this.battleshipModel.ships[shipID];
}

BattleshipController.prototype.gridClick = function (e) {
    var x = parseInt(e.target.getAttribute('data-x'));
    var y = parseInt(e.target.getAttribute('data-y'));
    if (this.shooting) {
        this.shoot(x, y);
    } else {
        this.placeShip(x, y);
        this.battleshipView.updateShipButtons();
    }
}

BattleshipController.prototype.hoverEffect = function (e) {
    if (!(this.selectedShip === null) && !this.shooting) {
        var x = parseInt(e.target.getAttribute('data-x'));
        var y = parseInt(e.target.getAttribute('data-y'));
        var isHorizantal = this.selectedShip.isHorizantal;
        for (var i = 0; i < this.selectedShip.size; i++) {
            $("[data-x=" + (x + (i * isHorizantal)) + "][data-y=" + (y + (i * (!isHorizantal))) + "]").toggleClass("active");
        }
    }
}

BattleshipController.prototype.placeShip = function (x, y) {
    this.battleshipModel.placeShip(x, y, this.selectedShip);

    if (this.selectedShip != null) {
        if (this.selectedShip.isPlaced) {
            this.selectedShip = null;
        }
    }

    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard(this.shooting);
}

BattleshipController.prototype.startGame = function (e) {
    if (this.battleshipModel.allShipsPlaced()) {
        if (this.playerID == 1 && (!this.playerVsComputer)) {
            this.playerID = 2;
        }
        else {
            this.playerID = 1;
        }
        this.shooting = true;
        this.battleshipView.updateGrid(this.shooting);
        this.battleshipView.updateScoreBoard(this.shooting);
        this.battleshipView.updateShipButtons(this.shooting);
        $(e.target).hide();
        this.battleshipView.endButton.show();
        $("#gridTitle").hide().html("Enemy fleet. Shoot!").fadeIn();
        $("#playerText").html("PLAYER " + this.playerID);
    }
    else {
        alert("You need to place all your ships before you can start the game");
    }

}

BattleshipController.prototype.endGame = function (e) {
    this.shooting = false;
    if (this.battleshipModel.sunkenShips === this.battleshipModel.CONST_NR_OF_SHIPS) {
        this.battleshipView.addNewPlayedGame(this.playerID, this.battleshipModel.totalShots, this.playerVsComputer);
    } else {
        this.battleshipView.addNewPlayedGame(this.playerID, 0, this.playerVsComputer);
    }
    $("#gridTitle").hide().html("Your fleet").fadeIn();
    $("#playerText").html("PLAYER " + this.playerID);
    $(e.target).hide();
    this.playerVsComputer = false;
    this.battleshipModel.init(); // Resets all ships and scores
    this.battleshipView.startButton.show();
    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard(this.shooting);
    this.battleshipView.updateShipButtons(this.shooting);
}

BattleshipController.prototype.changeDirection = function () {
    var battleShips = this.battleshipModel.ships;
    for (var i = 0; i < battleShips.length; i++) {
        battleShips[i].isHorizantal = (!battleShips[i].isHorizantal)
    }
}

BattleshipController.prototype.generatePositions = function () {
    this.playerVsComputer = true;
    this.battleshipModel.computerGeneratePositions();
    this.shooting = true;
    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard(this.shooting);
    this.battleshipView.updateShipButtons(this.shooting);
    this.battleshipView.startButton.click();
}


BattleshipController.prototype.shoot = function (x, y) {
    this.battleshipModel.shoot(x, y);
    this.battleshipView.updateGrid(this.shooting);
    this.battleshipView.updateScoreBoard(this.shooting);
}
