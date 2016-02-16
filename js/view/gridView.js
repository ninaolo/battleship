// Whole-script strict mode syntax
"use strict";

function GridView(container, board, size) {

    this.container = container;
    this.boardModel = board;
    this.size = size;

    this.playerText = this.container.find("#playerText");
    this.playerText.html("Your fleet");

    this.placeShips = this.container.find("#placeShips");
    this.placeShips.html("hej");

    this.grid = this.container.find("#grid");
    this.grid.html(this.drawGrid());
    this.gridButtons = this.grid.children().children();

    // Hur man kmr åt en enstaka ruta
    //this.gridButtons.eq(10).css( "background-color", "red" );

    this.placedShips = this.container.find("#placedShips");
    this.placedShips.html(0);
    this.sunkenShips = this.container.find("#sunkenShips");
    this.sunkenShips.html(0);
    this.totalShots = this.container.find("#totalShots");
    this.totalShots.html(0);

}

GridView.prototype.drawGrid = function() {
    var html = "";

    for (var row = 0; row < this.size; row++) {
        html += "<div class='row'>";

        for (var col = 0; col < this.size; col++) {
            html += "<button data-x=" + col + " data-y=" + (this.size-row-1) + " class='btn btn-primary'>" + row + "</button>";
        }
        html += "</div>";
    }
    return html;
}

GridView.prototype.updateGrid = function() {

    for(var i = 0; i < this.gridButtons.length; i++) {
        var x = this.gridButtons[i].getAttribute("data-x");
        var y = this.gridButtons[i].getAttribute("data-y");
        if (this.boardModel.board[x][y] == -1) {
            this.gridButtons.eq(i).addClass("active");
        } else {
            this.gridButtons.eq(i).removeClass("active");
        }
    }
}