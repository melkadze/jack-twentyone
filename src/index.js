////temporary console log code
//borrowed from stack overflow; don't mind the vars


/*
(function () {
  var old = console.log;
  var logger = document.getElementById('log');
  console.log = function () {
    for (var i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'object') {
          logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
      } else {
          logger.innerHTML += arguments[i] + '<br />';
      }
    }
  }
})();
*/


//need let here for deck var
let Deck = {
  //Deck (capital) is object, deck (lowercase) is current deck var
  deck: [],

  getPath: function(suit, card){
    return `assets/deck/${suit}${card}.png`
  },

  addToDeck: function(suit, fileref) {
    //deck array guide:
    //0 index is card number (10, J, Q)
    //1 index is suite (H, S, C)
    //2 index is card value (1, 9, 10) [1 will be tried as both 1 and 11]
    for (let i = 1; i < 14; i++) {
      if (i === 1) {
        Deck.deck.push(['Ace', suit, 1, Deck.getPath(fileref, 'a')])
      } else if (i === 11) {
        Deck.deck.push(['Jack', suit, 10, Deck.getPath(fileref, 'j')])
      } else if (i === 12) {
        Deck.deck.push(['Queen', suit, 10, Deck.getPath(fileref, 'q')])
      } else if (i === 13) {
        Deck.deck.push(['King', suit, 10, Deck.getPath(fileref, 'k')])
      } else {
        Deck.deck.push([`${i}`, suit, i, Deck.getPath(fileref, i)])
      }
    }
  },

  removeCard: function(i) {
    Deck.deck.splice(i, 1);
  },

  createDeck: function() {
    //first is display named, second is for filename ref
    Deck.addToDeck('Spades', 's');
    Deck.addToDeck('Clubs', 'c');
    Deck.addToDeck('Hearts', 'h');
    Deck.addToDeck('Diamonds', 'd');
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

  drawToHand: function(hand, handOwner, isHidden){
    hand.push(Deck.drawCard())
    Display.pushImg(hand, handOwner, isHidden)
  },

  dealerDraw: function(){
    Game.drawToHand(Game.dealerHand, 'd', false)
    Game.drawToHand(Game.dealerHand, 'd', true)
    console.log(`The dealer has drawn a ${Game.dealerHand[0][0]} of ${Game.dealerHand[0][1]} and a second, hidden card.`)
  },

  playerDraw: function(){
    Game.drawToHand(Game.playerHand, 'p', false)
    Game.drawToHand(Game.playerHand, 'p', false)
    console.log(`You have drawn a ${Game.playerHand[0][0]} of ${Game.playerHand[0][1]} and a ${Game.playerHand[1][0]} of ${Game.playerHand[1][1]}. Your hand is worth ${Game.getHandValue(Game.playerHand)}.`)
    console.log(`Will you "hit" or "stay"?`)
  },

  //make all of these compressed (reuse) [or dont bc will have to modify DOMStrings]

  playerHit: function(){
    Game.drawToHand(Game.playerHand, 'p', false)
  },

  dealerHit: function(){
    Game.drawToHand(Game.dealerHand, 'd', false)
  },

  playerTestBust: function(){
    return Game.getHandValue(Game.playerHand) > 21;
  },

  dealerTestBust: function(){
    return Game.getHandValue(Game.dealerHand) > 21;
  },

  playerBust: function(){
    console.log(`You bust; you lose! Type "replay" to play again!`)
    document.getElementById('player').className += ' lose';
    document.getElementById('playerText').textContent = 'You bust!';
    Game.replayPrompt();
  },

  dealerBust: function(){
    console.log(`Dealer bust; you win! Type "replay" to play again!`)
    document.getElementById('dealer').className += ' lose';
    document.getElementById('dealerText').textContent = 'Dealer busts!';
    Game.replayPrompt();
  },

  playerTurn: function(){
    document.getElementById('buttonsPlayerTurn').classList.remove('hidden');

    document.getElementById('hit').onclick = function() {
        Game.playerHit();
        console.log(`When you hit, you drew a ${Game.playerHand[(Game.playerHand.length - 1)][0]} of ${Game.playerHand[(Game.playerHand.length - 1)][1]}. Your hand is worth ${Game.getHandValue(Game.playerHand)}.`);
        if(Game.playerTestBust() == false){
          console.log(`Will you "hit" or "stay"?`);
          Game.playerTurn();
        } else {
          Game.playerBust();
        }
    }

    
    document.getElementById('stay').onclick = function() {
      console.log(`You chose to stay. It's now the dealer's turn.`);
      Game.dealerTurn();
      return;
    }
  },

  dealerTurn: function(){
    document.getElementById('buttonsPlayerTurn').className += ' hidden';
    document.getElementById('buttonsDealerTurn').classList.remove('hidden');

    console.log(`The dealer currently has a ${Game.dealerHand[0][0]} of ${Game.dealerHand[0][1]} and a ${Game.dealerHand[1][0]} of ${Game.dealerHand[1][1]}. Their hand is worth ${Game.getHandValue(Game.dealerHand)}.`);
    //reveal 2nd card
    document.getElementById("d2").src = Game.dealerHand[1][3];



    document.getElementById('next').onclick = function() {
      if (Game.getHandValue(Game.dealerHand) < 17) {
        Game.dealerHit();
        console.log(`When the dealer hit, they drew a ${Game.dealerHand[(Game.dealerHand.length - 1)][0]} of ${Game.dealerHand[(Game.dealerHand.length - 1)][1]}. Their hand is worth ${Game.getHandValue(Game.dealerHand)}.`);
        if(Game.dealerTestBust() == true){
          Game.dealerBust();
          return;
        }
      } else if (Game.dealerTestBust() == false){
        console.log(`The dealer stays!`)
        Game.testWinner();
        return;
      } else {
        Game.dealerBust();
      }
    }
  },

  testWinner: function(){
    //at this point, no player busts
    console.log(`Since the dealer got ${Game.getHandValue(Game.dealerHand)} and you got ${Game.getHandValue(Game.playerHand)}...`)
    if (Game.getHandValue(Game.dealerHand) < Game.getHandValue(Game.playerHand)) {
      console.log(`You win!`)
      document.getElementById('player').className += ' win';
      document.getElementById('playerText').textContent = 'You win!';
    } else if (Game.getHandValue(Game.dealerHand) > Game.getHandValue(Game.playerHand)) {
      console.log(`You lose!`)
      document.getElementById('dealer').className += ' win';
      document.getElementById('dealerText').textContent = 'Dealer wins!';
    } else {
      console.log(`You tie!`)
      document.getElementById('player').className += ' tie';
      document.getElementById('dealer').className += ' tie';
      document.getElementById('dealerText').textContent = 'Dealer ties!';
      document.getElementById('playerText').textContent = 'You tie!';
    }
    Game.replayPrompt();
    return;
  },

  replayPrompt: function(){
    document.getElementById('buttonsPlayerTurn').className += ' hidden';
    document.getElementById('buttonsDealerTurn').className += ' hidden';
    document.getElementById('buttonsEnd').classList.remove('hidden');
    document.getElementById('replay').onclick = function() {
      console.log(`Reloading game...`);
      location.reload();
      return;
    }
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

const Display = {
  pushImg: function(fromHand, handOwner, isHidden) {
    const i = fromHand.length;
    if (isHidden == false){
      document.getElementById(`${handOwner}${i}`).src = fromHand[i - 1][3];
    } else {
      document.getElementById(`${handOwner}${i}`).src = 'assets/hidden.png';
    }
    document.getElementById(`${handOwner}${i}`).className += " shownCard";
  }
}

Game.init();


//console.log(Deck.deck)


////fix Game. to maybe nothing or this.
///add case for natural blackjack
//remove console logs & end funct
//prettier