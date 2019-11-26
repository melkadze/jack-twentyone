export function add(suit) {
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

export function create() {
  addToDeck('S');
  addToDeck('C');
  addToDeck('H');
  addToDeck('D');
}

export function removeCard(index){
  deck.splice(index, 1);
}


//import { add, create, removeCard } from "./deck";

/*
DOMStrings.input.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".nes-btn").click();
  }
});

getWordInfo();
*/