'use strict'

const LASER_SPEED = 80;
var gHero = { pos: { i: 12, j: 6 }, isShoot: false };
var gLaserInterval
var gLaserCount = -1
var gLaserPos = []
var gHitAlienScore = 0
const shootingAudio = new Audio('sounds/shooting-audio.audio');

// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO;
}

// Handle game keys
function onKeyDown(ev) {
    var j = gHero.pos.j;
    var i = gHero.pos.i;
    switch (ev.code) {
        case 'ArrowLeft':
            // nextLocation.j--;
            moveHero(j - 1)
            break;
        case 'ArrowRight':
            // nextLocation.j++;
            moveHero(j + 1)
            break;
        case 'Space':
            // nextLocation.j++;
            shoot()
            break;
        case 'KeyN':
            // nextLocation.j++;
            blowUpNegs()
            break;
        default:
            return null;
    }
}

// Move the hero right (1) or left (-1)
function moveHero(ev) {
    if (ev < 1 || ev > gBoard.length - 2) return;

    //REMOVE
    //MODEL
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = null;
    //DOM
    updateCell(gHero.pos);

    //ADD
    //MODEL
    gBoard[gHero.pos.i][ev].gameObject = HERO;
    //DOM
    updateCell({ i: gHero.pos.i, j: ev }, HERO);
    //Update Location
    gHero.pos.j = ev;
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() {
    if (gHero.isShoot) return

    // shootingAudio.play();  
    gLaserInterval = setInterval(blinkLaser, 50, gHero.pos)
    gHero.isShoot = true
}

//LASER
// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) {
    updateCell(gHero.pos, HERO)

    var i = pos.i + gLaserCount;
    var j = pos.j;
    gLaserPos.push(pos.j);
    var nextLaserPos = { i, j: gLaserPos[0] };
    var prevLaserPos = { i: i + 1, j: gLaserPos[0] };

    //The laser hit Alien/////
    if (gBoard[nextLaserPos.i][nextLaserPos.j].gameObject === ALIEN) {
        gGame.aliensCount--
        gHitAlienScore += 10
        
        //Deleted the Alien
        gBoard[nextLaserPos.i][nextLaserPos.j].gameObject = null
        updateCell(nextLaserPos)
        
        //Deleted the Laser/////
        gBoard[prevLaserPos.i][prevLaserPos.j].gameObject = EMPTY
        updateCell(prevLaserPos)
        
        handleAlienHit(nextLaserPos)
        
        //Reset The Laser/////
        gLaserCount = -1
        gLaserPos = []
        //Close the interval/////
        checkVictory()
        clearInterval(gLaserInterval)
        gHero.isShoot = false
        return
    }

    //ADD
    //MODEL
    gBoard[nextLaserPos.i][nextLaserPos.j].gameObject = LASER
    //DOM
    updateCell(nextLaserPos, LASER)

    //REMOVE
    //MODEL
    gBoard[nextLaserPos.i][nextLaserPos.j].gameObject = EMPTY
    //DOM
    updateCell(prevLaserPos)

    if (i === 0) {
        gLaserPos = []
        //Restart Laser's Location
        i = gHero.pos.i
        j = gHero.pos.j

        //REMOVE LASER AND RESTART HE'S LOCATION
        //MODEL
        gBoard[nextLaserPos.i][nextLaserPos.j].gameObject = EMPTY
        //DOM
        updateCell(nextLaserPos)

        //Restart hes Count / Clear interval
        gLaserCount = 0
        gHero.isShoot = false
        clearInterval(gLaserInterval)
    }

    gLaserCount--
    var nextLaserPos = { i, j: gLaserPos };

    //If the laserCount Smaller then the board itSelf
    if (gLaserCount <= -(gBoard.length - 1)) {
        clearInterval(gLaserInterval)
    }
}

function blowUpNegs() {

}