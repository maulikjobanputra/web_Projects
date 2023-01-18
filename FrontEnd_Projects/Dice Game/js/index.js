function play(){
    let rand1 = Math.floor(Math.random() * 6) + 1;
    let rand2 = Math.floor(Math.random() * 6) + 1;

    if(rand1>rand2){
        document.getElementById("title").textContent = "🚩Player 1 Wins!";
    }else if(rand1<rand2){
        document.getElementById("title").textContent = "🚩Player 2 Wins!";
    }else{
        document.getElementById("title").textContent = "🚩Match Draw!";
    };
    
    document.getElementById("player1").setAttribute("src", "images/dice" + rand1 + ".png");
    
    document.getElementById("player2").setAttribute("src", "images/dice" + rand2 + ".png");
    
    document.getElementById("btn").textContent= "PLAY again!";
}

