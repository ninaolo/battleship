// Whole-script strict mode syntax
"use strict";

var BattleshipController = function(view, model) {

    for(var i = 0; i < view.gridButtons.length; i++) {
        view.gridButtons.eq(i).click(this.test);
    }

}

BattleshipController.prototype.test = function() {
    alert("test");
}