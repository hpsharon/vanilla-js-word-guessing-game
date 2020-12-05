(() => {
  const wordEl = document.getElementById('word');
  const wrongLettersElement = document.getElementById('wrong-letters');
  const playAgainBtn = document.getElementById('play-again');
  const popup = document.getElementById('popup-container');
  const notification = document.getElementById('notification-container');
  const finalMessage = document.getElementById('final-message');
  
  const figureParts = document.querySelectorAll('.figure-part');
  const words = ['bedroom', 'college', 'forward', 'nationalist', 'observation', 'interactive',  'museum', 'tactic', 'direct']

  const correctLetters = [];
  wrongLetters = [];

  const selectRandomWord = (words) => {
    return words[Math.floor(Math.random() * words.length)];
  }

  let selectedWord = selectRandomWord(words);

  //show the hidden word
  const displayWord = () => {
    wordEl.innerHTML = `
      ${selectedWord
        .split('')
        .map((letter) => {
          let elem = document.createElement('span');
          elem.className = 'letter';
          elem.innerText = correctLetters.includes(letter) ? letter : '';
          return elem.outerHTML;
        })
        .join('')
      }
    `
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    
    if(innerWord === selectedWord){
      finalMessage.innerText = 'You Won 😀😀😀';
      popup.style.display = 'flex';
    }
  }

  //Update the wrong letters
  const updateWrondLettersEl = () => {
    //Display wrong letters
    wrongLettersElement.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    //display figure parts
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;
      if(index < errors){
        part.style.display = 'block';
      } else {
        part.style.display = 'none';
      }
    })

    //Check if lost the game
    if (wrongLetters.length === figureParts.length){
      finalMessage.innerText = 'Game Over 🙁🙁🙁';
      popup.style.display = 'flex';
    }
  }

  
  const showNotification = () => {
    notification.classList.add('show');
    setTimeout(()=>{
      notification.classList.remove('show');
    }, 2000)
  }

  //Keydown letter press
  window.addEventListener('keydown', (event) => {
    //key code is depracted. Using the regex allows us to enforce English chars
    const typedLetter = event.key;
    const reg = /^\w{1}$/i; // only English chars

    if (reg.test(typedLetter)){ //if it's an Englsih chaer
      if (selectedWord.includes(typedLetter)){ // and it's in the selected word
        if (!correctLetters.includes(typedLetter)){ // but not already typed
          correctLetters.push(typedLetter); // add it to the correct letters array
          displayWord();
        } else { // if the user typed the letter already
          showNotification()
        }
      } else { // if it's not in the seleted word
        if (!wrongLetters.includes(typedLetter)){ // and typed already
          wrongLetters.push(typedLetter); // add the letter to wrong letters
          updateWrondLettersEl();
        } else {
          showNotification();
        }
      }
    }
  })

  //restart the game
  playAgainBtn.addEventListener('click', () => {
    //Empty the array
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = selectRandomWord(words);
    displayWord();
    updateWrondLettersEl();
    popup.style.display = 'none';
  })

  displayWord();
})();

