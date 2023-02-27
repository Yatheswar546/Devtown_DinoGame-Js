score = 0;
cross = true;

audio = new Audio('./sounds/music.mp3');
audiogo = new Audio('./sounds/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);

// document.addEventListener('keydown', function(event){
//     console.log(event.key);
// });
// console.log() is used to check in console screen if the key is working or not, we have keyup & keypress also 

// onkeydown are some of the global event listeners
// University of Delaware pdf
document.onkeydown = function (e) {
    console.log("key code is: ", e.keyCode)
    if (e.keyCode == 38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode == 39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));  
        dino.style.left = dinoX + 112 + "px";  
        //get Property is a method which an object that contains the css properties of that element in a string
        // null is pseudo element
        //px means pixel
    } 
    if (e.keyCode == 37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
    }
};
// setInterval is a method which calls a method and performs a task after a certain Interval of Time
setInterval(() => {
    dino = document.querySelector('.dino');
    gameover = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

    // offsets : offset in x-direction & offset in y-direction
    // offsetX & offsetY : we have MouseEvent & get coordinates in (x,y)
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY);

    // min limit
    if (offsetX < 73 && offsetY < 52) {
        gameover.innerHTML = "Game Over !!! Reload to Start Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause()
        }, 1000);
    }
    // max limit
    else if(offsetX < 145 && cross){
        score = score + 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniduration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animate-duration'));
            newduration = aniduration - 0.1;
            obstacle.style.animationDuration = newduration + 's';
            console.log('New Animation Duration: ', newduration);
        }, 500);
    }
}, 10);

function updateScore(score){
    totalscore.innerHTML = "Your Score: " + score;
}


