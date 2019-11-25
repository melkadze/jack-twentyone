/*import { getWordInfo, DOMStrings } from "./api";

DOMStrings.input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".nes-btn").click();
  }
});

getWordInfo();
*/

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

addToDeck('S');
console.log(deck)

function createDeck() {

}