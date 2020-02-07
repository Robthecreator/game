var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// The next color for the game sequence (a new color for gamePatter array)
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


// The user color selection and it appends it to userClickedPattern
$(".btn").click(function(event) {
  userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


// Sounds
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}


// Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Level Start
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// Checks If The Users Sequence Is Right Or Wrong
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    playSound("wrong");
    startOver();
  }
}


// Start again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
