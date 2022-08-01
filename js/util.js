'use strict'

function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function showModal() {
    const elModal = document.querySelector('.modal')
    var elMsg = document.querySelector('.user-msg')
    var elBtn = document.querySelector('.play-again')

    elModal.style.display = 'block'
    elMsg.innerText = (gIsWin) ? 'Victory! Well Done' : 'You Lost Buddy...'

    if (gIsWin) {
        elMsg.style.color = '#04e900'
        elBtn.style.backgroundColor = '#4faf4f'
    } else {
        elMsg.style.color = '#b32e2e9e'
        elBtn.style.backgroundColor = '#a12a2a'
    }
}

function closeModal() {
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function showScore() {
    var elScore = document.querySelector('.score span')
    elScore.innerText = gHitAlienScore
}

function countNeighbors(mat, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {

            if (j < 0 || j > mat[0].length - 1) continue

            if (i === rowIdx && j === colIdx) continue

            console.log('mat[i][j]',mat[i][j]);
            if (mat[i][j]) {
                count++
            }
        }
    }
    return count
}
