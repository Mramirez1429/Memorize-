const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let boardLock = false;
let firstCard, secondCard;
let checkDone = true;

endGame();

/*this function detects if two cards have been clicked on and if so it calls matchChecking*/
function flipCard() {
    if (boardLock) return;
   
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
       
    secondCard = this;
    matchChecking();
    
}

/*matchingChecking checks if both cards are matching and if so it calls cardDisable and unFlipCards  */
function matchChecking() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? cardDisable() : unFlipCards();
}

/*cardDisable removes the abilty to click on the card and resets the board */
function cardDisable() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    boardRest();
}

/*this disables  the flip motion so it stays facing up */
function unFlipCards() {
    boardLock = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        boardRest();
    }, 1500);
}

/*this function rests the board everytime it is called */
function boardRest() {
    [hasFlippedCard, boardLock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//first  method excuted randomize the cards
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

//gameover
function endGame() {
    
       
            alert("When completed \nclick restart to start a new game\nor go back to choose a harder level ");
      
    

}
function restart() {
    location.reload();
}

cards.forEach(card => card.addEventListener('click', flipCard));
