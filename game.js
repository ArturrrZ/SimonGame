// alert("Testing");
var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var gameStarted=false;
function nextSequence() {
    // return random index from 0 to 3
    userClickedPattern=[];
    level++;
    $("h1").text(`Level: ${level}`);
    random_index=Math.floor(Math.random()*4); //0 to 3
    randomChosenColor(random_index);
    

}  

function randomChosenColor(randomIndex) {
    
    let randomColor= buttonColours[randomIndex]
    gamePattern.push(randomColor);
    flash(randomColor);
    playSound(randomColor);
}

function flash(color) {
    $("#"+color).fadeOut(100).fadeIn(100);
}

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function showTapAnimation(color){
    $(`#${color}`).addClass("pressed");
    setTimeout(function(){
        $(`#${color}`).removeClass("pressed");
    },100); 
}

$(".btn").on("click",function(){
    if (gameStarted===true){let userChosenColor=$(this).attr("id");
    showTapAnimation(userChosenColor);
    playSound(userChosenColor);
     
  
   userClickedPattern.push(userChosenColor);
   checkAnswer(userClickedPattern.length-1);}
})
// gameStarted! ???
$(document).one("keypress", function(){
    // startTheGame()
    nextSequence();
    gameStarted=true;
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        // next level
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function(){nextSequence();},1000);
        }

    }
    else {
        gameStarted=false;
        let gameOverAudio=new Audio ("sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},300);
        $("h1").text("Game Over");
        
        setTimeout(function(){startOver();},1000);
        

    }
}

function startOver() {
    level=0;
    gamePattern=[];
    $("h1").text("Press any key to start over")
    $(document).one("keypress", function(){
        // startTheGame()
        gameStarted=true;
        nextSequence();
        
    });     
}