const gridContainer = document.querySelector(".grid-container");
let currentThemeCards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;


document.querySelector('.loyalist').addEventListener('click', () => changeTheme('loyalist'));
document.querySelector('.traitor').addEventListener('click', () => changeTheme('traitor'));
document.querySelector(".score").textContent = score;


function changeTheme(theme) {
  // Set score to 0 and update the display
  score = 0;
  document.querySelector(".score").textContent = score;

  // Construct the file path based on the theme
  const filePath = `./data/${theme}.json`;

  fetch(filePath)
      .then((res) => res.json())
      .then((data) => {
          // Duplicate each card so there are two of each
          currentThemeCards = data.concat(data); 
          shuffleCards();
          generateCards();
      });

  // Update the card back based on the theme
  const cardBackImage = theme === 'loyalist' ? 'url("assets/Loyalist/Loyalist_card_back.png")' : 'url("assets/Traitor/Traitor_card_back.png")';
  document.documentElement.style.setProperty('--card-back-image', cardBackImage);
  
  // Update the body background image based on the theme
  const bgImage = theme === 'loyalist' ? 'url("assets/Loyalist/Loyalist_bg.png")' : 'url("assets/Traitor/Traitor_bg.png")';
  document.documentElement.style.setProperty('--bg-image', bgImage);
}

function shuffleCards() {
  for (let i = currentThemeCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentThemeCards[i], currentThemeCards[j]] = [currentThemeCards[j], currentThemeCards[i]];
  }
}

function generateCards() {
  gridContainer.innerHTML = ''; // Clear existing cards
  for (let card of currentThemeCards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
      <div class="front">
          <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
  
    this.classList.add("flipped");
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;
  
    checkForMatch();
  }

  
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
  checkAllMatched();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkAllMatched() {
  const allFlipped = document.querySelectorAll('.flipped').length === currentThemeCards.length;
  if (allFlipped) {
    document.querySelector('.loyalist').style.display = 'inline-block';
    document.querySelector('.traitor').style.display = 'inline-block';
  }
}


