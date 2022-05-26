const tileDisplay = document.querySelector('.tile-container')
const keyboardRow1 = document.querySelector('.key-container-row-1')
const keyboardRow2 = document.querySelector('.key-container-row-2')
const keyboardRow3 = document.querySelector('.key-container-row-3')
const messageDisplay = document.querySelector('.message-container')

let wordle
let letterCount
let guessRows = []

let startDate = new Date(2022, 4, 4)

const getWordle = () => {
    let currentDate = Date.now()
    let dateDiff = Math.floor((currentDate - startDate) / 1000 / 60 / 60 / 24)
    console.log(dateDiff)

    wordle = words[dateDiff].toUpperCase()
    if (wordle == nil) {
        wordle = "tester"
    }
    console.log(wordle)
    letterCount = wordle.length

    for (let i = 0; i < 6; i++) {
        let newRow = []
        for(let j = 0; j < letterCount; j++) {
            newRow.push('')
        }
        console.log(newRow)
        guessRows.push(newRow)
        newRow = []
    }

    guessRows.forEach((guessRow, guessRowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
        guessRow.forEach((_guess, guessIndex) => {
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
            tileElement.classList.add('tile')
            rowElement.append(tileElement)
        })
        tileDisplay.append(rowElement)
    })
}

getWordle()

const keysRow1 = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
]

const keysRow2 = [
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    '👎',
]

const keysRow3 = [
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '👌',
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

const handleClick = (letter) => {
    if (!isGameOver) {
        console.log('clicked', letter)
        if (letter === '👎') {
            deleteLetter()
            return
        } if (letter === '👌') {
            checkRow()
            return
        }
        addLetter(letter)
    }
}

const addLetter = (letter) => {
    if (currentTile < letterCount && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    console.log('guess', guess)
    if (currentTile > letterCount -1) {
        console.log('guess is ' + guess)
        flipTile()
        if (wordle == guess) {
            showMessage('Skuxx!')
            isGameOver = true
            return
        } else {
            if (currentRow  >= letterCount) {
                isGameOver = true
                showMessage('Unluggy')
                return
            }
            if (currentRow < letterCount) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 4000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}

keysRow1.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboardRow1.append(buttonElement)
})

keysRow2.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboardRow2.append(buttonElement)
})

keysRow3.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboardRow3.append(buttonElement)
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
