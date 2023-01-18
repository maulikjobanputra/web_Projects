let drums = document.querySelectorAll(".drum");

for(let i = 0; i < drums.length; i++){

    drums[i].addEventListener("click", function() {
        playSound(drums[i]);
        
        addEffect(drums[i]);

        setTimeout(removeEffect , 100, (drums[i]));
    });
    
    
    document.addEventListener("keydown", function(event) {
        if(event.key==drums[i].innerHTML){

            playSound(drums[i]);

           
            addEffect(drums[i]);

            setTimeout(removeEffect, 100, drums[i]);
        };
    });

};

function playSound(currentDrum){
    new Audio("sounds/"+ currentDrum.innerHTML +".mp3").play();
}

function addEffect(currentDrum){
    currentDrum.classList.add('pressed');
}

function removeEffect(currentDrum){
    currentDrum.classList.remove('pressed');
}

