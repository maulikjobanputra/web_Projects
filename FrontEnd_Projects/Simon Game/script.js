let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 1;



$(document).on('keydown',()=>{
    if(!started){
        nextSequence();
        started = true;
    };
});



$(".btn").on('click', function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    let audio = new Audio("sounds/"+$(this).attr("id")+".mp3");
    audio.play();
    $(this).addClass('pressed')
    setTimeout(()=>{$(this).removeClass('pressed')}, 100);
    checkAnswer(userClickedPattern.length - 1);
});










const checkAnswer = (currentLevel)=>{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(nextSequence, 1000);
        };
    }else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $('h1').text("Game Over! Press Any Key to Continue.");
        $("body").addClass('game-over');
        setTimeout(()=>{$("body").removeClass('game-over')}, 200)
        level = 1;
        gamePattern = [];
        started = false;
    };
};






const nextSequence= ()=>{
    userClickedPattern = [];
    $('h1').text('Level '+level);
    level++;
    
    let randomNumber = Math.floor(Math.random() * 4);;
    
    let randomChosenColor = buttonColors[randomNumber];
    
    
    $("#"+randomChosenColor).fadeOut(50);
    $("#"+randomChosenColor).fadeIn(50);
    
    let audio = new Audio("sounds/"+randomChosenColor+".mp3");
    audio.play();
    gamePattern.push(randomChosenColor); 
};











