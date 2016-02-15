// Whole-script strict mode syntax
"use strict";

var BattleshipController = function(view, model) {

    view.playerText.click(function() {
        view.sunkenShips.html(3);
    });

}