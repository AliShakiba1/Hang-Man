const secretPhrases = ['never', 'you', 'that', 'bullet', 'break']

let randomItem = ''
let result = ''
let mistakes = 0
let clicked = []

const img = document.querySelector('#image').querySelector('img')
const clue = document.querySelector('#clue').querySelector('p')
const endGame = document.querySelector('#endGame').querySelector('p')
const letters = document.querySelector('#letters')

selectRandomItem = () => {
  randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)]
  letters.addEventListener('click', buttonHandler)
  window.addEventListener('keydown', keyHandler)
  console.log(randomItem)
  updateImg(mistakes)
}

updateImg = mistake => {
  if (mistake == 7) {
    window.location.reload()
  }
  img.src = `./assets/hangman${mistake}.png`
}

checkLose = mistakes => {
  if (mistakes === 6) {
    endGame.innerText = `you lose and the world is : "${randomItem}"`
    updateImg(mistakes)
  }
}

checkWin = () => {
  if (randomItem === result) {
    img.src = `./assets/winner.png`
  }
}

setUnderScores = () => {
  let splitWord = randomItem.split('')
  let mapWord = splitWord.map(item => {
    return clicked.includes(item) ? item : '_'
  })
  result = mapWord.join('')
  clue.innerText = result
}

letterHandler = letter => {
  document.querySelector(`#${letter.toUpperCase()}`).classList.add('used')
  letter = letter.toLowerCase()
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null
  if (randomItem.indexOf(letter) >= 0) {
    setUnderScores()
    checkWin()
  } else if (randomItem.indexOf(letter) === -1) {
    mistakes++
    checkLose(mistakes)
    updateImg(mistakes)
  }
}

buttonHandler = e => {
  letterHandler(e.target.id)
}

keyHandler = e => {
  letterHandler(e.key)
}

selectRandomItem()
setUnderScores()
