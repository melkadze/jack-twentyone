!function(e){var n={};function t(a){if(n[a])return n[a].exports;var d=n[a]={i:a,l:!1,exports:{}};return e[a].call(d.exports,d,d.exports,t),d.l=!0,d.exports}t.m=e,t.c=n,t.d=function(e,n,a){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:a})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(t.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var d in e)t.d(a,d,function(n){return e[n]}.bind(null,d));return a},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){let t={deck:[],getPath:function(e,n){return`assets/deck/${e}${n}.png`},addToDeck:function(e,n){for(let a=1;a<14;a++)1===a?t.deck.push(["Ace",e,1,t.getPath(n,"a")]):11===a?t.deck.push(["Jack",e,10,t.getPath(n,"j")]):12===a?t.deck.push(["Queen",e,10,t.getPath(n,"q")]):13===a?t.deck.push(["King",e,10,t.getPath(n,"k")]):t.deck.push([`${a}`,e,a,t.getPath(n,a)])},removeCard:function(e){t.deck.splice(e,1)},createDeck:function(){t.addToDeck("Spades","s"),t.addToDeck("Clubs","c"),t.addToDeck("Hearts","h"),t.addToDeck("Diamonds","d")},randomCard:function(){const e=Math.floor(Math.random()*t.deck.length);return[e,t.deck[e]]},drawCard:function(){const e=t.randomCard();return t.removeCard(e[0]),e[1]}},a={dealerHand:[],playerHand:[],getHandValue:function(e){let n=0,t=0;for(let a=e.length-1;a>-1;a--)n+=e[a][2],1==e[a][2]&&t++;for(;t>0;)n<12&&(n+=10),t--;return n},drawToHand:function(e,n,a){e.push(t.drawCard()),d.pushImg(e,n,a)},dealerDraw:function(){a.drawToHand(a.dealerHand,"d",!1),a.drawToHand(a.dealerHand,"d",!0),console.log(`The dealer has drawn a ${a.dealerHand[0][0]} of ${a.dealerHand[0][1]} and a second, hidden card.`)},playerDraw:function(){a.drawToHand(a.playerHand,"p",!1),a.drawToHand(a.playerHand,"p",!1),console.log(`You have drawn a ${a.playerHand[0][0]} of ${a.playerHand[0][1]} and a ${a.playerHand[1][0]} of ${a.playerHand[1][1]}. Your hand is worth ${a.getHandValue(a.playerHand)}.`),console.log("Will you hit or stay?")},playerHit:function(){a.drawToHand(a.playerHand,"p",!1)},dealerHit:function(){a.drawToHand(a.dealerHand,"d",!1)},playerTestBust:function(){return a.getHandValue(a.playerHand)>21},dealerTestBust:function(){return a.getHandValue(a.dealerHand)>21},playerBust:function(){console.log("You bust; you lose! Play again?"),document.getElementById("player").className+=" lose",document.getElementById("playerText").textContent="You bust!",a.replayPrompt()},dealerBust:function(){console.log("Dealer bust; you win! Play again?"),document.getElementById("dealer").className+=" lose",document.getElementById("dealerText").textContent="Dealer busts!",a.replayPrompt()},playerTurn:function(){document.getElementById("buttonsPlayerTurn").classList.remove("hidden"),document.getElementById("hit").onclick=function(){a.playerHit(),console.log(`When you hit, you drew a ${a.playerHand[a.playerHand.length-1][0]} of ${a.playerHand[a.playerHand.length-1][1]}. Your hand is worth ${a.getHandValue(a.playerHand)}.`),0==a.playerTestBust()?(console.log("Will you hit or stay?"),a.playerTurn()):a.playerBust()},document.getElementById("stay").onclick=function(){console.log("You chose to stay. It's now the dealer's turn."),a.dealerTurn()}},dealerTurn:function(){document.getElementById("buttonsPlayerTurn").className+=" hidden",document.getElementById("buttonsDealerTurn").classList.remove("hidden"),console.log(`The dealer currently has a ${a.dealerHand[0][0]} of ${a.dealerHand[0][1]} and a ${a.dealerHand[1][0]} of ${a.dealerHand[1][1]}. Their hand is worth ${a.getHandValue(a.dealerHand)}.`),document.getElementById("d2").src=a.dealerHand[1][3],document.getElementById("next").onclick=function(){if(a.getHandValue(a.dealerHand)<17){if(a.dealerHit(),console.log(`When the dealer hit, they drew a ${a.dealerHand[a.dealerHand.length-1][0]} of ${a.dealerHand[a.dealerHand.length-1][1]}. Their hand is worth ${a.getHandValue(a.dealerHand)}.`),1==a.dealerTestBust())return void a.dealerBust()}else{if(0==a.dealerTestBust())return console.log("The dealer stays!"),void a.testWinner();a.dealerBust()}}},testWinner:function(){console.log(`Since the dealer got ${a.getHandValue(a.dealerHand)} and you got ${a.getHandValue(a.playerHand)}...`),a.getHandValue(a.dealerHand)<a.getHandValue(a.playerHand)?(console.log("You win!"),document.getElementById("player").className+=" win",document.getElementById("playerText").textContent="You win!"):a.getHandValue(a.dealerHand)>a.getHandValue(a.playerHand)?(console.log("You lose!"),document.getElementById("dealer").className+=" win",document.getElementById("dealerText").textContent="Dealer wins!"):(console.log("You tie!"),document.getElementById("player").className+=" tie",document.getElementById("dealer").className+=" tie",document.getElementById("dealerText").textContent="Dealer ties!",document.getElementById("playerText").textContent="You tie!"),a.replayPrompt()},replayPrompt:function(){document.getElementById("buttonsPlayerTurn").className+=" hidden",document.getElementById("buttonsDealerTurn").className+=" hidden",document.getElementById("buttonsEnd").classList.remove("hidden"),document.getElementById("replay").onclick=function(){console.log("Reloading game..."),location.reload()}},init:function(){t.createDeck(),a.dealerDraw(),a.playerDraw(),a.playerTurn()}};const d={pushImg:function(e,n,t){const a=e.length;document.getElementById(`${n}${a}`).src=0==t?e[a-1][3]:"assets/hidden.png",document.getElementById(`${n}${a}`).className+=" shownCard"}};a.init()}]);