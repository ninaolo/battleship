$(function() {

    var player1Model = new BattleshipModel();
    var player1Grid = new GridView($("#gridView1"), player1Model, 1);
    var player1Controller = new BattleshipController(player1Grid, player1Model);

    var player2Model = new BattleshipModel();
    var player2Grid = new GridView($("#gridView2"), player2Model, 2);
    var player2Controller = new BattleshipController(player2Grid, player2Model);

});