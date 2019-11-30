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

  getHandValue: function(hand){
    let acc = 0;
    for(let i = hand.length - 1; i > -1; i--){
      acc += hand[i][2];
    }
    return acc;
    //add case for ace
  },

  dealerDraw: function(){
    dealerHand = [Deck.drawCard(), Deck.drawCard()]
    console.log(`The dealer has drawn a ${dealerHand[0][0]} of ${dealerHand[0][1]} and a ${dealerHand[1][0]} of ${dealerHand[1][1]}. Their hand is worth ${Game.getHandValue(dealerHand)}`)
    console.log(`If you are not debugging this app, kindly forget the second card.`);
  },

  playerDraw: function(){
    playerHand = [Deck.drawCard(), Deck.drawCard()]
    console.log(`You have drawn a ${playerHand[0][0]} of ${playerHand[0][1]} and a ${playerHand[1][0]} of ${playerHand[1][1]}. Your hand is worth ${Game.getHandValue(playerHand)}.`)
    console.log(`Will you "hit" or "stay"?`)
  },

  init: function() {
    Deck.createDeck();
    Game.dealerDraw();
    Game.playerDraw();
  }
}


document.getElementById("word-form").addEventListener("submit",function(e) {
  e.preventDefault();
  if(document.getElementById("word-input").value == `hit`) {
    console.log(`You choose to hit.`);
  }
  if(document.getElementById("word-input").value == `stay`) {
    console.log(`You chose to stay, but this hasn't been programmed yet. Wow.`);
  }
});



Game.init();
Deck.drawCard();

console.log(Deck.deck)