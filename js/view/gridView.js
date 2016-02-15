
function updateGrid() {

    var html = "";

    for (var i = 0; i < 9; i++) {
        html += "<div class='row'>";

        for (var j = 0; j < 9; j++) {
            html += "<button class='btn btn-primary'>" + i + "</button>";
        }
        html += "</div>";
    }
    return html;
}


var GridView = function (container, model, player) {

    this.player = player;

    this.playerText = container.find("#playerText");
    this.playerText.html("Player " + this.player);
    this.grid = container.find("#grid");
    this.grid.html(updateGrid());



}