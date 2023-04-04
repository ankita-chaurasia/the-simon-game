
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(".btn").on("click", function(){

    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkPattern(userClickedPattern.indexOf(userChosenColor));

});

$(document).on("keydown", function(evt){

    if(!gameStarted){

        gameStarted = true;
        $("#level-title").html("Level 0");
        nextSequence();

    }
 
});

function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber]; 
    level++;

    $("#level-title").html("Level " + level);

    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);

}

function playSound(color){

    $("#" + color).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();

}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkPattern(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(nextSequence, 1000);

        }
    }
    else{
        gameOver();
    }

}

function gameOver(){

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    
    var audio = new Audio("sounds/wrong.mp3");

    audio.play();
    
    $("#level-title").html("Game Over! Press Any Key to Restart.");
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

}
