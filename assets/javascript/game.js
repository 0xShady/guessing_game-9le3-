var possibleWords = [
    "Albania",
    "Austria",
    "Belarus",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "Czechia",
    "Denmark",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Iceland",
    "Ireland",
    "Italy",
    "Kosovo",
    "Malta",
    "Moldova",
    "Monaco",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Serbia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
  ];
var guessedLetters = [];
var guessingWord = [];
var AlreadyGussed = [];
var wordToMatch;
var numGuess;
var wins = 0;
var pause = false;
var loseSound = new Audio("./assets/sounds/ahahah.mp3");
var winSound = new Audio("./assets/sounds/clever.wav");
var championSound = new Audio("./assets/sounds/crazysob.mp3");

function initializeGame() {
  wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
  //   if (wordToMatch.length <= 4) {
  //   numGuess = 4
  // } else if (wordToMatch.length >4 && wordToMatch.length <= 7) {
  //   numGuess = Math.floor(wordToMatch.length * 0.4)
  // } else if (wordToMatch.length >7 && wordToMatch.length <= 10) {
  //   numGuess = Math.floor(wordToMatch.length * 0.5)
  // } else if (wordToMatch.length >10 && wordToMatch.length <= 14) {
  //   numGuess = Math.floor(wordToMatch.length * 0.6)
  // } else if (wordToMatch.length >14) {
  //   numGuess = 7;
  // }
  numGuess = 7;
  for (var i=0; i < wordToMatch.length; i++){
    if (wordToMatch[i] === " ") {
      guessingWord.push(" ")
    } 
    else {
      guessingWord.push("_");
    }
  }
  updateDisplay();
};

function resetGame() {
  if (AlreadyGussed.length === possibleWords.length) {
    championSound.play()
    AlreadyGussed = []
    wins = 0
    setTimeout(resetGame, 6000);
  }
  else {
    pause = false;
    document.getElementById('welcome').className = 'blink';
    
    wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
    console.log(wordToMatch)
    if (AlreadyGussed.includes(wordToMatch) === true) {
      resetGame();
    }
    // Set number of guesses (higher or lower) based on word length
    // if (wordToMatch.length <= 4) {
    //   numGuess = 4
    // } else if (wordToMatch.length >4 && wordToMatch.length <= 7) {
    //   numGuess = Math.floor(wordToMatch.length * .67)
    // } else if (wordToMatch.length >7 && wordToMatch.length <= 10) {
    //   numGuess = Math.floor(wordToMatch.length * .5)
    // } else if (wordToMatch.length >10 && wordToMatch.length <= 14) {
    //   numGuess = Math.floor(wordToMatch.length * .52)
    // } else if (wordToMatch.length >14) {
    //   numGuess = 7;
    // }
    numGuess = 7;
    guessedLetters = [];
    guessingWord = [];
    for (var i=0; i < wordToMatch.length; i++){
      if (wordToMatch[i] === " ") {
        guessingWord.push(" ")
      } 
      else {
        guessingWord.push("_");
      }
    }
    updateDisplay();
  }
};

function updateDisplay () {
  document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = guessingWord.join("");
  document.getElementById("remainingGuesses").innerText = numGuess;
  document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ");
};

document.onkeydown = function(event) {
  if (isLetter(event.key) && pause === false) {
  checkForLetter(event.key.toUpperCase());
  }
  document.getElementById('welcome').className = 'noBlink';
};

var isLetter = function(ch){
  return typeof ch === "string" && ch.length === 1
  && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
};

function checkForLetter(letter) {
  var foundLetter = false;

  for (var i=0; i < wordToMatch.length; i++) {
    if (letter === wordToMatch[i]) {
      guessingWord[i] = letter
      foundLetter = true
      if (guessingWord.join("") === wordToMatch) {
        wins++
        AlreadyGussed.push(wordToMatch)
        console.log(AlreadyGussed)
        pause = true;
        winSound.play();
        updateDisplay();
        setTimeout(resetGame, 4000);
      }
    }
  }
  if (foundLetter === false) {
    if (guessedLetters.includes(letter) === false) {
      guessedLetters.push(letter)
      numGuess--
    }
    if (numGuess === 0) {
      AlreadyGussed.push(wordToMatch);
      console.log(AlreadyGussed)
      guessingWord = wordToMatch.split();
      pause = true;
      loseSound.play();
      setTimeout(resetGame, 4000);
    }
  }
  updateDisplay();
};

initializeGame();
