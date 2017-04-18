
function Board(){
	this.board = $(".board");
};

Board.prototype.render = function(){
	for (var x= 0; x<3; x++){
		for (var y = 0; y<3; y++){
			var square = $("<div class=\"square\"></div>");
			square.attr({
				"data-x": x,
				"data-y": y
			});
			this.board.append(square);
		}
	}
};

function Player(mark){
	this.mark = mark;
	this.positions = [];

}

function Game(player1, player2){
	//var player1 = player1;
	//var player2 = player2;
	var player = player1;
	var turn = 0;
	var gameOverMessage = "It's a draw!";
	var possibleWins = [
	[[0,0],[1,0],[2,0]],
	[[0,1],[1,1],[2,1]],
	[[0,2],[1,2],[2,2]],
	[[0,0],[0,1],[0,2]],
	[[1,0],[1,1],[1,2]],
	[[2,0],[2,1],[2,2]],
	[[0,0],[1,1],[2,2]],
	[[2,0],[1,1],[0,2]],
	];

	this.play = function(){      
		$(".square").click(function(){
			if(!$(this).html()){
			    $(this).html(player.mark);
			    var x = $(this).attr("data-x");
			    var y = $(this).attr("data-y");
			    player.positions.push([x,y]);
			    turn++;
			//switch player
			    if (!gameOver(player)){
				    player = player == player1 ? player2 : player1;
				    $(".currentPlayer").html("Current player: " + player.mark);
			    }
			    else{
				    $(".result").html(gameOverMessage).show();
			    }
		    }
		});  
	    
	 
	};

	var gameOver = function(player){
		var win = false;
		var playerArray = player.positions;
		var positionFoundInArray = function(position){
			var found = false;
            playerArray.forEach(function(element){           	
            	if (element[0]==position[0] && element[1]==position[1]){
            		found = true;
            	};
            });
            return found;
		};
		possibleWins.forEach(function(possibleWin){
			if(possibleWin.every(positionFoundInArray)){
				win = true;
				gameOverMessage = "Player "+ player.mark + " wins!"
			};            
		});
		return win || turn==9; 
	};

}


$(document).ready(function(){
	
	var gameBoard = new Board();
	gameBoard.render();
	var player1 = new Player("x");
	var player2 = new Player("o");
	var game = new Game(player1, player2);
	
     
	$("button").click(function(){
		$(".square").empty();
		$(".result").hide();
		player1.positions = [];
		player2.positions = [];
		game = new Game(player1,player2);		
	});
    game.play();
});