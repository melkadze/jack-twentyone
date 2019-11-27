let deck = [];

function addToDeck(suit) {
  for (let i = 1; i < 14; i++) {
    if (i === 1) {
      deck.push(['A', suit])
    } else if (i === 11) {
      deck.push(['J', suit])
    } else if (i === 12) {
      deck.push(['Q', suit])
    } else if (i === 13) {
      deck.push(['K', suit])
    } else {
      deck.push([`${i}`, suit])
    }
  }
}

function createDeck() {
  addToDeck('S');
  addToDeck('C');
  addToDeck('H');
  addToDeck('D');
}

function removeCard(index){
  deck.splice(index, 1);
}

function randomCard() {
 console.log(deck[Math.floor(Math.random() * deck.length)])
}

function drawCard() {
  
}

createDeck();
randomCard();
removeCard(7);

console.log(deck)