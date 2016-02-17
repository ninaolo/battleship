// Whole-script strict mode syntax
"use strict";

$(function() {

    var size = 9;
    var battleshipModel = new BattleshipModel(size);
    var battleshipView = new BattleshipView($("#battleshipView"), battleshipModel);
    var battleshipController = new BattleshipController(battleshipView, battleshipModel);

});