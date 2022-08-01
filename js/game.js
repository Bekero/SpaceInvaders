'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '🛸';
const ALIEN = 'ALIEN';
const ALIEN_IMG = '👽';
const LASER = '🥒';
const SKY = 'SKY'
const WALL = 'WALL'
const EMPTY = ''
const GROUND = 'GROUND'

var gIsWin
var gMoveAliensInterval
var gBoard;
var gGame = {
    isOn: false,
    aliensCount: 0
}


function startGame() {
    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard, 2, 1)
    renderBoard(gBoard, '.game-container')
    clearInterval(gLaserInterval)
    moveAliens()
    closeModal()
    gHitAlienScore = 0
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
    var board = [];

    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []
        for (var j = 0; j < BOARD_SIZE; j++) {

            var cell = board[i][j]
            cell = createCell()
            if (i === board[0].length - 1) cell.type = GROUND;
            if (i === 0 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            board[i][j] = cell;
        }
    }
    return board;
}

// Render the board as a <table> to the page
function renderBoard(board, selector) {
    var strHTML = ''

    strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cellClass = getClassName({ i: i, j: j });
            const cell = board[i][j]

            if (cell.type === GROUND) {
                cellClass += ' ground';
            } else if (cell.type === SKY) {
                cellClass += ' sky';
            } else {
                cellClass += ' wall';
            }

            strHTML += `<td data-i="${i}" data-j="${j}" class="cell ${cellClass}" >`

            if (cell.gameObject === HERO) {
                strHTML += HERO
            } if (cell.gameObject === ALIEN) {
                strHTML += ALIEN_IMG
            }

            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

function cleanBoard(selector) {
    var strHTML = ''

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    // gBoard[pos.i][pos.j].gameObject = gameObject;
    showScore()
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || '';
}

function checkVictory() {
    if (gGame.aliensCount === 0) {
        gIsWin = true
        showModal()
        console.log('Its a WINNER!!!')
    }
}

function checkGameOver() {
    closeModal()
    clearInterval(gIntervalAliens)
}

