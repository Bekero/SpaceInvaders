'use strict'


const ALIEN_SPEED = 500;

var gIntervalAliens;
var gAlien
var gAliens
var gIsShiftDown
var gIsShiftLeft
var gIsShiftRight

var gStartIdx = 1
var gEndIdx = 8
var gIsAlienFreeze = true;
var gAliensTopRowIdx = 1;
var gAliensBottomRowIdx = 3;

function createAliens(board, startIdx, endIdx) {
    // gAliens = []

    for (var i = 1; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var currCell = board[i][j - 1];
            if (i < startIdx + 1 && j > endIdx) {
                currCell.gameObject = ALIEN;
                gGame.aliensCount += 1;
            }
        }
    }
    console.log('board : ', board);
}

function handleAlienHit(pos) {
    gBoard[pos.i][pos.j].gameObject = null;

    updateCell({ i: pos.i, j: pos.j });

}

function checkLoss(board) {

}



function shiftBoardRight(board) {
    gIsShiftRight = true

    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = board.length - 1; j > 0; j--) {
            if (board[i][j].gameObject === ALIEN) {

                if (board[i][j + 1].type === WALL) {
                    clearInterval(gIntervalAliens)
                    shiftBoardDown(board, gStartIdx, gEndIdx)
                    gIsShiftRight = false
                    return
                }
                if (board[i][j].gameObject === null) return
                //Empty The currCell
                board[i][j].gameObject = EMPTY
                updateCell({ i, j })

                //Fill Up The currCell
                board[i][j + 1].gameObject = ALIEN
                updateCell({ i, j: j + 1 }, ALIEN_IMG)
            }
        }
        gEndIdx++
        gStartIdx++
    }
}

function shiftBoardDown(board, gStartIdx, gEndIdx) {

    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = 0; j < board.length; j++) {

            if (board[i][j].gameObject === ALIEN) {

                if (board[i][j].gameObject === null) return
                //Empty The currCell
                board[i - 1][j].gameObject = EMPTY
                updateCell({ i: i - 1, j })

                //Fill Up The currCell
                board[i + 1][j].gameObject = ALIEN
                updateCell({ i: i + 1, j }, ALIEN_IMG)

            }
        }
    }
    gAliensTopRowIdx++
    gAliensBottomRowIdx++

    if (gIsShiftRight) return gIntervalAliens = setInterval(shiftBoardLeft, ALIEN_SPEED, board, gStartIdx, gEndIdx)
    return gIntervalAliens = setInterval(shiftBoardRight, ALIEN_SPEED, board, gStartIdx, gEndIdx)
}

function shiftBoardLeft(board, gStartIdx, gEndIdx) {
    gIsShiftLeft = true

    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = 0; j < board.length; j++) {

            if (board[i][j].gameObject === ALIEN) {
                if (board[i][j - 1].type === WALL) {

                    clearInterval(gIntervalAliens)
                    shiftBoardDown(board, gStartIdx, gEndIdx)
                    gIsShiftLeft = false
                    return
                }
                if (board[i][j].gameObject === null) return

                //Empty The currCell
                board[i][j + 1].gameObject = EMPTY
                updateCell({ i, j: j + 1 })

                //Fill Up The currCell
                board[i][j - 1].gameObject = ALIEN
                updateCell({ i, j: j - 1 }, ALIEN_IMG)

            }
        }
    }
    gEndIdx--
    gStartIdx--
}

// runs the interval for moving aliens side to side and down
// it re-renders the board every time
// when the aliens are reaching the hero row - interval stops
function moveAliens() {
    gIntervalAliens = setInterval(shiftBoardRight, ALIEN_SPEED, gBoard, 1, 8)

}