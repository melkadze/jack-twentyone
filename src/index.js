//need let here for deck var
let Deck = {
  //Deck (capital) is object, deck (lowercase) is current deck var
  deck: [],

  addToDeck: function(suit) {
    //deck array guide:
    //0 index is card number (10, J, Q)
    //1 index is suite (H, S, C)
    //2 index is card value (1, 9, 10) [1 will be tried as both 1 and 11]
    for (let i = 1; i < 14; i++) {
      if (i === 1) {
        Deck.deck.push(['Ace', suit, 1])
      } else if (i === 11) {
        Deck.deck.push(['Jack', suit, 10])
      } else if (i === 12) {
        Deck.deck.push(['Queen', suit, 10])
      } else if (i === 13) {
        Deck.deck.push(['King', suit, 10])
      } else {
        Deck.deck.push([`${i}`, suit, i])
      }
    }
  },

  removeCard: function(i) {
    Deck.deck.splice(i, 1);
  },

  createDeck: function() {
    Deck.addToDeck('Spades');
    Deck.addToDeck('Clubs');
    Deck.addToDeck('Hearts');
    Deck.addToDeck('Diamonds');
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
    let numAces = 0;
    for(let i = hand.length - 1; i > -1; i--){
      acc += hand[i][2];
      //only catches aces
      if (hand[i][2] == 1) {
        numAces++;
      }
    }
    //occurs after so as to not prioritize aces over other cards (like having point total of 8, getting ace making it 19, and then busting after getting a 6)
    while (numAces > 0) {
      if (acc < 12) {
        acc += 10;
      }
      numAces--
    }
    return acc;
  },

  dealerDraw: function(){
    dealerHand = [Deck.drawCard(), Deck.drawCard()];
    console.log(`The dealer has drawn a ${dealerHand[0][0]} of ${dealerHand[0][1]} and a ${dealerHand[1][0]} of ${dealerHand[1][1]}. Their hand is worth ${Game.getHandValue(dealerHand)}.`)
    console.log(`If you are not debugging this app, kindly forget the second card.`);
  },

  playerDraw: function(){
    playerHand = [Deck.drawCard(), Deck.drawCard()]
    console.log(`You have drawn a ${playerHand[0][0]} of ${playerHand[0][1]} and a ${playerHand[1][0]} of ${playerHand[1][1]}. Your hand is worth ${Game.getHandValue(playerHand)}.`)
    console.log(`Will you "hit" or "stay"?`)
  },

  //make all of these compressed (reuse) [or dont bc will have to modify DOMStrings]

  playerHit: function(){
    playerHand.push(Deck.drawCard());
  },

  dealerHit: function(){
    dealerHand.push(Deck.drawCard());
  },

  playerTestBust: function(){
    return Game.getHandValue(playerHand) > 21;
  },

  dealerTestBust: function(){
    return Game.getHandValue(dealerHand) > 21;
  },

  playerBust: function(){
    console.log(`You bust; you lose! Refresh to play again!`)
  },

  dealerBust: function(){
    console.log(`Dealer bust; you win! Refresh to play again!`)
  },

  playerTurn: function(){
    document.getElementById("word-form").addEventListener("submit",function(e) {
    e.preventDefault();
    if(document.getElementById("word-input").value == `hit`) {
      document.getElementById("word-input").value = '';
        Game.playerHit();
        console.log(`When you hit, you drew a ${playerHand[(playerHand.length - 1)][0]} of ${playerHand[(playerHand.length - 1)][1]}. Your hand is worth ${Game.getHandValue(playerHand)}.`);
        if(Game.playerTestBust() == false){
          console.log(`Will you "hit" or "stay"?`);
          Game.playerTurn();
        } else {
          Game.playerBust();
        }
    }
    if(document.getElementById("word-input").value == `stay`) {
      document.getElementById("word-input").value = '';
      console.log(`You chose to stay. It's now the dealer's turn.`);
      Game.dealerTurn();
      return;
    }
  });
  },

  dealerTurn: function(){
    console.log(`The dealer currently has a ${dealerHand[0][0]} of ${dealerHand[0][1]} and a ${dealerHand[1][0]} of ${dealerHand[1][1]}. Their hand is worth ${Game.getHandValue(dealerHand)}.`);
    while (Game.getHandValue(dealerHand) < 17) {
      Game.dealerHit();
      console.log(`When the dealer hit, they drew a ${dealerHand[(dealerHand.length - 1)][0]} of ${dealerHand[(dealerHand.length - 1)][1]}. Their hand is worth ${Game.getHandValue(dealerHand)}.`);
    }
    if(Game.dealerTestBust() == false){
      console.log(`The dealer stays!`)
      Game.testWinner();
      return;
    } else {
      Game.dealerBust();
    }
  },

  testWinner: function(){
    //at this point, no player busts
    console.log(`Since the dealer got ${Game.getHandValue(dealerHand)} and you got ${Game.getHandValue(playerHand)}...`)
    if (Game.getHandValue(dealerHand) < Game.getHandValue(playerHand)) {
      console.log(`You win!`)
    } else if (Game.getHandValue(dealerHand) > Game.getHandValue(playerHand)) {
      console.log(`You lose!`)
    } else {
      console.log(`You tie!`)
    }
    return;
  },

  end: function(){
    //put a function here if required for cleanup
  },

  init: function(){
    Deck.createDeck();
    Game.dealerDraw();
    Game.playerDraw();
    Game.playerTurn();
    Game.end();
  }
}

Game.init();

//console.log(Deck.deck)
////fix Game. to maybe nothing or this.