// Whole-script strict mode syntax
"use strict";

$(function() {

    var size = 9;
    var board = new BattleshipBoard(size);
    var playerGrid = new GridView($("#gridView"), board, size);
    var playerController = new BattleshipController(playerGrid, board);


});