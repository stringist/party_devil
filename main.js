import './style.css';

window.addEventListener("load", start);
let lives;
let points;
const container1 = document.querySelector("#container1");
const container2 = document.querySelector("#container2");
const container3 = document.querySelector("#container3");
const container4 = document.querySelector("#container4");
const container5 = document.querySelector("#container5");
const container6 = document.querySelector("#container6");
const container7 = document.querySelector("#container7");
const container8 = document.querySelector("#container8");
const vinylSprite = document.querySelector("#vinyl_sprite");
const soundtrack = document.querySelector("#soundtrack");
const click = document.querySelector("#click");
const badSound = document.querySelector("#bad_sound");
const goodSound = document.querySelector("#good_sound");
const win = document.querySelector("#win");
const lose = document.querySelector("#lose");



function start() {
    console.log("start");
    document.querySelector("#game").classList.remove("hidden");
    document.querySelector("#title_screen").classList.remove("hidden");
    document.querySelector("#play_button").addEventListener("click", startGame);
    document.querySelector("#play_button").addEventListener("click", playClick);
    document.querySelector("#instructions_button").addEventListener("click", showInstructions1);
    document.querySelector("#instructions_button").addEventListener("click", playClick);
    document.querySelector("#start_game_button").addEventListener("click", slideOut);
    document.querySelector("#start_game_button").addEventListener("click", playClick);
    document.querySelector("#try_again").addEventListener("click", startGame);
    document.querySelector("#try_again").addEventListener("click", playClick);
    document.querySelector("#play_again").addEventListener("click", startGame);
    document.querySelector("#play_again").addEventListener("click", playClick);
    document.querySelector("#down_arrow").addEventListener("click", showInstructions2);
    document.querySelector("#down_arrow").addEventListener("click", playClick);

}



function showInstructions1() {
    console.log("showInstructions1");
    document.querySelector("#instructions1").classList.remove("hidden");
    document.querySelector("#instructions1").classList.add("slideUp");
    document.querySelector("#instructions1").addEventListener("click", showInstructions2);
}

function showInstructions2() {
    console.log("showInstructions2");
    document.querySelector("#instructions1").classList.remove("slideUp");
    document.querySelector("#instructions1").classList.add("slideOut");
    document.querySelector("#instructions2").classList.remove("hidden");
    document.querySelector("#instructions2").classList.add("slideUp");
}

function slideOut() {
    document.querySelector("#instructions1").classList.add("hidden");
    document.querySelector("#instructions2").classList.add("slideOut");
    document.querySelector("#title_screen").classList.add("fadeOut");
    document.querySelector("#instructions2").addEventListener("animationend", startGame);
}

function startGame() {
    soundtrack.currentTime = 0;
    soundtrack.volume = 0.3;
    lose.pause();
    soundtrack.play();
    console.log("startGame");
    hideScreens();
    document.querySelector("#mute_button").addEventListener("click", muteSound);

    points = 0;
    lives = 3;
    document.querySelector("#timer").addEventListener("animationend", gameOver);
    document.querySelector("#score_counter").textContent = points;
    container1.classList.add("position1");
    container2.classList.add("position4");
    container3.classList.add("position7");
    container4.classList.add("position2");
    container5.classList.add("position5");
    container6.classList.add("position8");
    container7.classList.add("position3");
    container8.classList.add("position6");
    container1.classList.add("moveLeft1");
    container2.classList.add("moveLeft2");
    container3.classList.add("moveLeft3");
    container4.classList.add("moveLeft1");
    container5.classList.add("moveLeft2");
    container6.classList.add("moveLeft3");
    container7.classList.add("moveLeft1");
    container8.classList.add("moveLeft2");
    document.querySelector("#vinyl_sprite").classList.add("slowRoll");
    document.querySelector("#skyline").classList.add("scroll");
    document.querySelector("#wheel_container_1").classList.add("spin");
    document.querySelector("#wheel_container_2").classList.add("spin");
    document.querySelector("#timer").classList.add("time");
    document.querySelector("#lives_container").classList.add("threeLives");
    document.querySelector("#mute_button").classList.add("soundOn");
    container1.addEventListener("click", clickGood);
    container2.addEventListener("click", clickGood);
    container3.addEventListener("click", clickGood);
    container8.addEventListener("click", clickGood);
    container4.addEventListener("click", clickBad);
    container5.addEventListener("click", clickBad);
    container6.addEventListener("click", clickBad);
    container7.addEventListener("click", clickBad);
    container1.addEventListener("animationiteration", restartGood);
    container2.addEventListener("animationiteration", restartGood);
    container3.addEventListener("animationiteration", restartGood);
    container8.addEventListener("animationiteration", restartGood);
    container4.addEventListener("animationiteration", restartBad);
    container5.addEventListener("animationiteration", restartBad);
    container6.addEventListener("animationiteration", restartBad);
    container7.addEventListener("animationiteration", restartBad);


}

function clickGood() {
    playGoodSound();
    console.log("clickGood");
    this.removeEventListener("click", clickGood);
    points += 15;
    document.querySelector("#score_counter").textContent = points;
    document.querySelector("#score_counter").classList.add("swell");
    // this.offsetHeight;
    this.classList.add("paused");
    this.firstElementChild.classList.add("rotate");
    this.firstElementChild.addEventListener("animationend", restartGood);
}

function clickBad() {
    playBadSound();
    console.log("clickBad");
    console.log(lives);
    // this.offsetHeight;
    this.removeEventListener("click", clickBad);
    this.classList.add("paused");
    this.firstElementChild.classList.add("rotate");
    this.firstElementChild.addEventListener("animationend", restartBad);

    document.querySelector("#lives_container").classList.add("swell");
    lives--;
    if (lives === 2) {
        document.querySelector("#lives_container").classList.add("twoLives");
    }
    if (lives === 1) {
        document.querySelector("#lives_container").classList.add("oneLife");
    }
    if (lives === 0) {
        document.querySelector("#lives_container").classList.add("noLives");
    }
    if (lives < 0) {
        gameOver();
    }

}

function restartGood() {
    console.log(this, "restartGood");

    this.classList.value = "";
    this.firstElementChild.classList.value = "";
    document.querySelector("#score_counter").classList.remove("swell");
    // to jump a frame
    this.offsetHeight;
    this.firstElementChild.offsetHeight;
    vinylSprite.classList.add("slowRoll");

    // randomNumber()
    const rndPos = randomNumber(8);
    const rndMov = randomNumber(3);
    // const rndZ = randomNumber(2);

    console.log("Pos: " + rndPos + " - Mov: " + rndMov);
    this.classList.add("position" + rndPos);
    this.classList.add("moveLeft" + rndMov);
    this.addEventListener("click", clickGood);
    // this.classList.add("z" + rndZ);
}

function restartBad() {
    console.log(this, "restartBad");
    this.classList.value = "";
    this.firstElementChild.classList.value = "";
    document.querySelector("#lives_container").classList.remove("swell");

    this.offsetHeight;
    this.firstElementChild.offsetHeight;

    const rndPos = randomNumber(8);
    const rndMov = randomNumber(3);
    // const rndZ = randomNumber(2);

    console.log("Pos: " + rndPos + " - Mov: " + rndMov);
    this.classList.add("position" + rndPos);
    this.classList.add("moveLeft" + rndMov);
    this.addEventListener("click", clickBad);
    // this.classList.add("z" + rndZ);

}

function randomNumber(n) {
    return Math.floor(Math.random() * n) + 1;
}

function hideScreens() {
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions1").classList.add("hidden");
    document.querySelector("#instructions2").classList.add("hidden");
    document.querySelector("#game_over").classList.add("hidden");
    document.querySelector("#level_complete").classList.add("hidden");
}

function gameOver() {
    console.log("gameOver");
    // play game over sound
    soundtrack.pause();

    container1.classList.value = "";
    container2.classList.value = "";
    container3.classList.value = "";
    container4.classList.value = "";
    container5.classList.value = "";
    container6.classList.value = "";
    container7.classList.value = "";
    container8.classList.value = "";
    document.querySelector("#skyline").classList.value = "";
    document.querySelector("#timer").removeEventListener("animationend", gameOver);
    document.querySelector("#timer").classList.remove("time");
    container1.removeEventListener("click", clickGood);
    container2.removeEventListener("click", clickGood);
    container3.removeEventListener("click", clickGood);
    container4.removeEventListener("click", clickGood);
    container5.removeEventListener("click", clickBad);
    container6.removeEventListener("click", clickBad);
    container7.removeEventListener("click", clickBad);
    container8.removeEventListener("click", clickBad);
    document.querySelector("#lives_container").classList = "";
    if (lives < 0 || points < 500) {
        document.querySelector("#game_over").classList.remove("hidden");
        document.querySelector("#game_over").classList.add("slideUp");

        playLose();
    } else {
        document.querySelector("#level_complete").classList.remove("hidden");
        document.querySelector("#level_complete").classList.add("slideUp");
        playWin();
    }

}

function playClick() {
    click.currentTime = 0;
    click.play();
    click.volume = 0.3;
}

function playBadSound() {
    badSound.currentTime = 0;
    badSound.play();
    badSound.volume = 0.3;

}

function playGoodSound() {
    goodSound.currentTime = 0;
    goodSound.play();
    goodSound.volume = 0.08;
}

function playWin() {
    win.currentTime = 0;
    win.play();
    win.volume = 0.8;
}

function playLose() {
    lose.currentTime = 0;
    lose.play();
    lose.volume = 0.4;
}

function muteSound() {
    document.querySelector("#mute_button").offsetHeight;
    document.querySelector("#mute_button").classList.remove("soundOn");
    document.querySelector("#mute_button").classList.add("soundOff");
    document.querySelector("#mute_button").removeEventListener("click", muteSound);
    document.querySelector("#mute_button").addEventListener("click", unMuteSound);
    soundtrack.muted = true;
    goodSound.muted = true;
    badSound.muted = true;
    click.muted = true;
    win.muted = true;
    lose.muted = true;
}

function unMuteSound() {
    document.querySelector("#mute_button").offsetHeight;
    document.querySelector("#mute_button").classList.remove("soundOff");
    document.querySelector("#mute_button").classList.add("soundOn");
    document.querySelector("#mute_button").removeEventListener("click", unMuteSound);
    document.querySelector("#mute_button").addEventListener("click", muteSound);
    soundtrack.muted = false;
    goodSound.muted = false;
    badSound.muted = false;
    click.muted = false;
    win.muted = false;
    lose.muted = false;
}