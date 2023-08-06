var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {
startAgain();
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#heading").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// start game on clicking button============
function startGame(){
  nextSequence();
}

$(".box").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer();
});

function nextSequence() {

  
  level++;
  $("#heading").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      console.log("wrong");
      playSound("wrong");
      $("#btn").text("Continue");
      // Add the "game-over" class to the body element
      $("body").addClass("game-over");

      setTimeout(function () {
        // Remove the "game-over" class after 100 milliseconds
        $("body").removeClass("game-over");
      }, 100);

      // Update the heading with "GAME OVER :("
      $("#heading").text("GAME OVER :(, Press any Key to Start");

      // Call startAgain() immediately if a m ismatch is found
      
    }
  }

  // If the loop completes without finding a mismatch, the answer is correct
  console.log("Success");
  
  if (userClickedPattern.length === gamePattern.length) {
    // Clear the userClickedPattern for the next round
    for(var i=1;i<=userClickedPattern.length;i++)
    $("#score").text(i);
    userClickedPattern = [];
    

    // Since the user has completed their entire sequence, progress to the next level
    setTimeout(nextSequence, 1000);
  }
  
}


function startAgain() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false; // Reset the 'started' flag
  
}