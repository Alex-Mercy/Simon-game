var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
 if (!started) {
   nextSequence();
   $("h1").text("Level " + level);
   started = true;
 }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
 if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
   if (userClickedPattern.length === gamePattern.length) {
     setTimeout(function(){
       nextSequence();
     }, 1000);
   }
 } else {
   playSound("wrong");
   $("body").addClass("game-over")
   setTimeout(function(){
     $("body").removeClass("game-over")
   },200);

   $("h1").text("Game Over, Press Any Key to Restart");
   startOver();
 }
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function animatePress(curentColour) {
  $("#" + curentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + curentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
