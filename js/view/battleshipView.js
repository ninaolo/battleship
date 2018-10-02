// Whole-script strict mode syntax
"use strict";

function BattleshipView(container, battleshipModel) {
    this.container = container;
    this.battleshipModel = battleshipModel;
    this.gridSize = battleshipModel.size;

    this.ships = this.container.find("#ships");
    this.createShipButtons();
    this.shipButtons = this.container.find("[id=shipButton]");

    this.startButton = this.container.find("#startButton");
    this.endButton = this.container.find("#endButton");
    this.endButton.hide();
    this.alignmentButton = this.container.find("#alignmentButton");
    this.computerGenerate = this.container.find("#computerGenerate");

    this.grid = this.container.find("#grid");
    this.grid.html(this.drawGrid());
    this.gridButtons = this.grid.children().children();

    this.placedShips = this.container.find("#placedShips");
    this.sunkenShips = this.container.find("#sunkenShips");
    this.totalShots = this.container.find("#totalShots");
    this.updateScoreBoard();
}

BattleshipView.prototype.drawGrid = function () {
    var html = "";

    for (var row = 0; row < this.gridSize; row++) {
        html += "<div class='row'>";

        for (var col = 0; col < this.gridSize; col++) {
            html += "<button data-x=" + col + " data-y=" + (this.gridSize - row - 1) + " class='btn btn-primary'>.</button>";
        }
        html += "</div>";
    }
    return html;
};

BattleshipView.prototype.createShipButtons = function () {
    var html = "";

    for (var i = 0; i < this.battleshipModel.ships.length; i++) {
        html += "<button id='shipButton' data-shipID='" + i + "' class='btn btn-default'>" + this.battleshipModel.ships[i].name + "</button>";
        html += "<br><br>"
    }
    this.ships.html(html);
};

BattleshipView.prototype.updateShipButtons = function (shooting) {
    for (var i = 0; i < this.battleshipModel.ships.length; i++) {
        if (this.battleshipModel.ships[i].isPlaced) {
            $("[data-shipID=" + i + "]").hide(300);
        } else {
            $("[data-shipID=" + i + "]").show(300);
        }
        $("#computerGenerate").show();
        $("#alignmentButton").show();
    }

    if (shooting) {
        $("#computerGenerate").hide();
        $("#alignmentButton").hide();
    }
};

BattleshipView.prototype.updateGrid = function (shooting) {

    for (var i = 0; i < this.gridButtons.length; i++) {

        var x = this.gridButtons[i].getAttribute("data-x");
        var y = this.gridButtons[i].getAttribute("data-y");

        if (shooting) {
            $(this.gridButtons[i]).removeClass("active").html(".");
            if (this.battleshipModel.isHit(x, y)) {
                $(this.gridButtons[i]).addClass("hit").html("S");
            } else if (this.battleshipModel.isMiss(x, y)) {
                $(this.gridButtons[i]).addClass("active").html(".");
            }
        } else {
            if (this.battleshipModel.hasShip(x, y)) {
                $(this.gridButtons[i]).addClass("active").html("S");
            } else {
                $(this.gridButtons[i]).removeClass("active").html(".");
                $(this.gridButtons[i]).removeClass("hit").html(".");
            }
        }

    }
};

BattleshipView.prototype.addNewPlayedGame = function (playerID, shots, playerVsComputer) {
    var ai = "";
    if (playerVsComputer) {
        ai = " vs AI";
    }
    this.container.find("#playerID").append("<h2>P" + playerID + ai + "</h2>");
    if (shots === 0) {
        this.container.find("#nrOfShots").append("<h2>lost game</h2>");
    } else {
        this.container.find("#nrOfShots").append("<h2>" + shots + " shots</h2>");
    }
};

BattleshipView.prototype.updateScoreBoard = function (shooting) {
    this.placedShips.html(this.battleshipModel.placedShips);
    this.sunkenShips.html(this.battleshipModel.sunkenShips);
    this.totalShots.html(this.battleshipModel.totalShots);
};
