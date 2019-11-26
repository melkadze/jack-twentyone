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

function drawCard() {
  
}

createDeck();

console.log(deck[7])
removeCard(7);

console.log(deck)