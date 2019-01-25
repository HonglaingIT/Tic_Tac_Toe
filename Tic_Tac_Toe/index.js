var gameStyle =getGameStyle();

$(document).ready(function() {
  $(".dots").click(function() {
    $(".guys, p").css("visibility", "hidden");
    $(".selector").css("visibility","hidden");
    $("td").css("visibility", "visible");
    $("button").css("visibility", "visible");
    aiCo = "black";
    huCo = "white";
    console.log("white");
     
    console.log('gameStyle', gameStyle);
  });
  $(".dots2").click(function() {
    $(".guys, p").css("visibility", "hidden");
    $(".selector").css("visibility","hidden");
    $("td").css("visibility", "visible");
    $("button").css("visibility", "visible");
    console.log("black");
    
     hu1Co = "white";
    console.log('gameStyle', gameStyle);
  });

  $("td").click(function() {
    if (gameStyle=="PVC_GOD"||gameStyle=="PVC_EASY"){
    move(this, huPlayer, huCo);
    console.log("clicked");}
    else if (gameStyle=="PVP"){
        if (moveN==0 || moveN==2 || moveN==4 ||moveN==6 || moveN==8){
          move(this, huPlayer, huCo);
        }else 
        move(this, hu1Player, hu1Co);
      };
    moveN++;
  });

});
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var huPlayer = "P";
var aiPlayer = "C";
var iter = 0;
var round = 0;
var aiCo = "white";
var huCo = "black";
var hu1Player= "p1";
var hu1Co="black";
var moveN= 0;

function move(element, player, color) {
  console.log("element: "+ element.id);
  var ava = avail(board);
        console.log('available :',ava[0]);
  var avai = ava.includes(parseInt(element.id));
  console.log('asasddsada',avai);
    if (!avai){
      alert("PLEASE CLICK ON EMPTY CELL")
      moveN--;
    }else{
  
  if (board[element.id] != "P" && (board[element.id] != "C" || board[element.id]!= "p1")) {
    round++;
    $(element).css("background-color", color);
    board[element.id] = player;
    console.log(board);

    if (winning(board, player)) {
      setTimeout(function() {
        alert("YOU WIN PLAYER "+color);
        resetAll();
      }, 000);
      return;
    } else if (round > 8) {
      setTimeout(function() {
        alert("TIE");
        if(gameStyle=="PVP"){
        resetAll();}
        else 
          reset();
      }, 000);
      return;
    } else {
      
      console.log('fuckxkckckckcck',gameStyle);
      if (gameStyle=="PVC_GOD"){
      round++;
      var index = minimax(board, aiPlayer).index;
      var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      console.log(board);
      console.log(index);}

     if (gameStyle=="PVC_EASY"){
        round++;
        var ava = avail(board);
        var index = ava[Math.floor(Math.random() * ava.length)]; 
        var selector = "#" + index;
      $(selector).css("background-color", aiCo);
      board[index] = aiPlayer;
      console.log(board);
      console.log(index);
      }
      
      if (winning(board, aiPlayer)) {
        setTimeout(function() {
          alert("YOU LOSE");
          reset();
        }, 500);
        return;
      } else if (round === 0) {
        setTimeout(function() {
          alert("tie");
          reset();
        }, 500);
        return;
      }
    }
  }
}
}
function resetAll() {
  location.reload();
  // round = 0;
  // board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  // $("td").css("background-color", "transparent");
}
function reset() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  $("td").css("background-color", "transparent");
}

function minimax(reboard, player) {
  iter++;
  let array = avail(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = reboard[array[i]];
    reboard[array[i]] = player;

    if (player == aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
    }
    reboard[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

//available spots
function avail(reboard) {
  return reboard.filter(s => s != "P" && s != "C"&&s != "p1");
}

// winning combinations
function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}


function getGameStyle() {
    $(document).ready(function () {
  $("input[type='radio']").on('change', function () {
       var selectedValue = $("input[name='group1']:checked").val();
       gameStyle=selectedValue;
         })
        gameStyle= "PVC_GOD";
   })
    return gameStyle;
}
getGameStyle()

