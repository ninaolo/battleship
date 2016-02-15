// Whole-script strict mode syntax
"use strict";

function drawGrid(size) {

    var html = "";

    for (var row = 0; row < size; row++) {
        html += "<div class='row'>";

        for (var col = 0; col < size; col++) {
            html += "<button data-x=" + col + " data-y=" + (size-row) + " class='btn btn-primary'>" + row + "</button>";
        }
        html += "</div>";
    }
    return html;
}


var GridView = function (container, model, size) {

    this.playerText = container.find("#playerText");
    this.playerText.html("Your fleet");

    this.placeShips = container.find("#placeShips");
    this.placeShips.html("hej");

    this.grid = container.find("#grid");
    this.grid.html(drawGrid(size));
    this.gridButtons = this.grid.children().children();

    // Hur man kmr åt en enstaka ruta
    //this.gridButtons.eq(10).css( "background-color", "red" );

    this.placedShips = container.find("#placedShips");
    this.placedShips.html(0);
    this.sunkenShips = container.find("#sunkenShips");
    this.sunkenShips.html(0);
    this.totalShots = container.find("#totalShots");
    this.totalShots.html(0);



}