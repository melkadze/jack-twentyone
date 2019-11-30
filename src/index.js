//need let here for deck var
let Deck = {
  //Deck (capital) is object, deck (lowercase) is current deck var
  deck: [],

  addToDeck: function(suit) {
    //deck array guide:
    //0 index is card number (10, J, Q)
    //1 index is suite (H, S, C)
    //2 index is card value (9, 10, 11) [11 will be tried as both 1 and 11]
    for (let i = 1; i < 14; i++) {
      if (i === 1) {
        Deck.deck.push(['A', suit, 11])
      } else if (i === 11) {
        Deck.deck.push(['J', suit, 10])
      } else if (i === 12) {
        Deck.deck.push(['Q', suit, 10])
      } else if (i === 13) {
        Deck.deck.push(['K', suit, 10])
      } else {
        Deck.deck.push([`${i}`, suit, i])
      }
    }
  },

  removeCard: function(i) {
    Deck.deck.splice(i, 1);
  },

  createDeck: function() {
    Deck.addToDeck('S');
    Deck.addToDeck('C');
    Deck.addToDeck('H');
    Deck.addToDeck('D');
  },

  randomCard: function() {
    const cardIndex = Math.floor(Math.random() * Deck.deck.length);
    return [cardIndex, Deck.deck[cardIndex]];
    //0 index is the card #, while 1 index is card content array
  },

  drawCard: function() {
    const chosenCard = Deck.randomCard();
    Deck.removeCard(chosenCard[0]);
    return chosenCard[1];
    //deletes card based on index, but preserves/returns its content
  },
}

let Game = {
  dealerHand: [],
  playerHand: [],

  dealerDraw: function(){
    dealerHand = [Deck.drawCard(), Deck.drawCard()]
    console.log(`The dealer has drawn a ${dealerHand[0][0]} of ${dealerHand[0][1]} and a ${dealerHand[1][0]} of ${dealerHand[1][1]}. Letting you know the second one is a cheat.`)
  },

  playerDraw: function(){
    playerHand = [Deck.drawCard(), Deck.drawCard()]
    console.log(`You have drawn a ${playerHand[0][0]} of ${playerHand[0][1]} and a ${playerHand[1][0]} of ${playerHand[1][1]}. `)
    console.log(`Hit or stay?`)
  },

  init: function() {
    Deck.createDeck();
    Game.dealerDraw();
    Game.playerDraw();
  }
}

Game.init();
Deck.drawCard();

console.log(Deck.deck)