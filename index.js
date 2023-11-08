document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
      { 'name': 'card1', 'img': 'images/image1.webp' },
      { 'name': 'card2', 'img': 'images/image2.webp' },
      { 'name': 'card3', 'img': 'images/image3.webp' },
      { 'name': 'card4', 'img': 'images/image4.webp' },
      { 'name': 'card5', 'img': 'images/image5.webp' },
      { 'name': 'card6', 'img': 'images/image6.webp' },
      { 'name': 'card7', 'img': 'images/image7.webp' },
      { 'name': 'card8', 'img': 'images/image8.webp' },
    ];
  
 
    let gameGrid = [...cardsArray, ...cardsArray];
    shuffleGrid();
  
    let firstGuess = '';
    let secondGuess = '';
    let count = 0;
    let moves = 0;
    let points = 0; 
    const delay = 1200;
    const gameBoard = document.getElementById('gameBoard');
    const grid = document.createElement('section');
    const pointsDisplay = document.createElement('div'); 
    const winMessage = document.createElement('div'); 
  
  
    pointsDisplay.id = 'pointsDisplay';
    pointsDisplay.textContent = `Points: ${points}`;
    gameBoard.parentNode.insertBefore(pointsDisplay, gameBoard);
  
 
    
    grid.className = 'grid';
    winMessage.id = 'winMessage';
    winMessage.className = 'win-message';
    winMessage.style.display = 'none';
    gameBoard.appendChild(winMessage);
    gameBoard.appendChild(grid);
  
    createBoard();
  
    grid.addEventListener('click', event => {
      const clicked = event.target.closest('.card');
  
      if (isValidClick(clicked)) {
        processCardClick(clicked);
      }
    });
  
    const resetButton = document.getElementById('resetButton');
    resetButton.addEventListener('click', resetGame);
  
    function shuffleGrid() {
      gameGrid.sort(() => 0.5 - Math.random());
    }
  
    function createBoard() {
      grid.innerHTML = '';
      gameGrid.forEach(({ name, img }) => {
        grid.appendChild(createCardElement(name, img));
      });
    }
  
    function createCardElement(name, img) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.name = name;
      card.appendChild(createCardSideElement('front'));
      card.appendChild(createCardSideElement('back', img));
      return card;
    }
  
    function createCardSideElement(side, img = '') {
      const element = document.createElement('div');
      element.className = side;
      if (img) element.style.backgroundImage = `url(${img})`;
      return element;
    }
  
    function isValidClick(clicked) {
      return (
        clicked &&
        clicked !== gameBoard &&
        !clicked.classList.contains('selected') &&
        !clicked.classList.contains('match') &&
        count < 2 
      );
    }
  
    function processCardClick(clicked) {
      if (count < 2) {
        clicked.classList.add('selected');
        count++;
        if (count === 1) {
          firstGuess = clicked.dataset.name;
        } else {
          secondGuess = clicked.dataset.name;
          moves++;
          if (firstGuess === secondGuess) {
            setTimeout(match, delay);
          } else {
            setTimeout(resetGuesses, delay);
          }
        }
      }
    }
  
    function match() {
      const selectedCards = document.querySelectorAll('.selected');
      selectedCards.forEach(card => {
        card.classList.add('match');
      });
      points++; 
      pointsDisplay.textContent = `Points: ${points}`; 
      checkWin();
      resetGuesses();
    }
  
    function resetGuesses() {
      [firstGuess, secondGuess, count] = ['', '', 0];
      grid.querySelectorAll('.selected').forEach(card => {
        card.classList.remove('selected');
      });
    }
  
    function checkWin() {
        if (grid.querySelectorAll('.match').length === gameGrid.length) {
          grid.style.display = 'none'; 
          winMessage.textContent = `Congratulations! You won the game in ${moves} moves with ${points} points!`;
          winMessage.style.display = 'flex'; 
        }
      }
  
    function resetGame() {
      [moves, points] = [0, 0]; 
      pointsDisplay.textContent = `Points: ${points}`; 
      winMessage.style.display = 'none'; 
      shuffleGrid();
      createBoard();
      grid.style.display = 'grid'; 
      winMessage.style.display = 'none'; 
    }
  });
  