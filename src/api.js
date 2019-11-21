export const DOMStrings = {
  input: document.getElementById("word-form"),
  inputWord: document.getElementById("word-input"),
  word: document.getElementById("display-word"),
  definition: document.getElementById("display-definition"),
  definition1: document.getElementById("display-definition-1"),
  definition2: document.getElementById("display-definition-2"),
  definition3: document.getElementById("display-definition-3"),
  definition4: document.getElementById("display-definition-4"),
  origin: document.getElementById("display-origin"),
  partOfSpeech: document.getElementById("display-part"),
  pronunciation: document.getElementById("display-pronunciation"),
  synonyms: document.getElementById("display-synonyms"),
  wordHead: document.getElementById("display-head-word"),
  definitionHead: document.getElementById("display-head-definition"),
  originHead: document.getElementById("display-head-origin"),
  partOfSpeechHead: document.getElementById("display-head-part"),
  pronunciationHead: document.getElementById("display-head-pronunciation"),
  synonymsHead: document.getElementById("display-head-synonyms")
};

export function getWordInfo() {
  DOMStrings.input.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (DOMStrings.inputWord.value == "") {
      alert("Input a word, please.");
      location.reload();
    }

    try {
      DOMStrings.word.innerText = "";
      DOMStrings.definition.innerText = "";
      DOMStrings.definition1.innerText = "";
      DOMStrings.definition2.innerText = "";
      DOMStrings.definition3.innerText = "";
      DOMStrings.definition4.innerText = "";
      DOMStrings.origin.innerText = "";
      DOMStrings.partOfSpeech.innerText = "";
      DOMStrings.pronunciation.innerText = "";
      DOMStrings.synonyms.innerText = "";

      DOMStrings.wordHead.innerText = "";
      DOMStrings.definitionHead.innerText = "";
      DOMStrings.originHead.innerText = "";
      DOMStrings.partOfSpeechHead.innerText = "";
      DOMStrings.pronunciationHead.innerText = "";
      DOMStrings.synonymsHead.innerText = "";

      const dictResult = await fetch(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${DOMStrings.inputWord.value}?key=f5a1330a-9bb9-4904-86ee-d1e087a29dcb`
      );
      const dictionary = await dictResult.json();

      const thesResult = await fetch(
        `https://dictionaryapi.com/api/v3/references/thesaurus/json/${DOMStrings.inputWord.value}?key=ed5e5882-5898-417e-919a-5b4a85765627`
      );
      const thesaurus = await thesResult.json();

      const displayWord = function() {
        DOMStrings.wordHead.innerText = "WORD";
        DOMStrings.word.innerText = dictionary[0].meta.id
          .split(":")[0]
          .split(",")[0];
        DOMStrings.definition.innerText = `1. ${dictionary[0].shortdef[0]}`;
        //the following is to deal with multiple definitions (no for loop as all unique names)
        if (dictionary[0].shortdef[1]) {
          DOMStrings.definition1.innerText = `2. ${dictionary[0].shortdef[1]}`;
        }
        if (dictionary[0].shortdef[2]) {
          DOMStrings.definition2.innerText = `3. ${dictionary[0].shortdef[2]}`;
        }
        if (dictionary[0].shortdef[3]) {
          DOMStrings.definition3.innerText = `4. ${dictionary[0].shortdef[3]}`;
        }
        if (dictionary[0].shortdef[4]) {
          DOMStrings.definition4.innerText = `5. ${dictionary[0].shortdef[4]}`;
        }
        DOMStrings.definitionHead.innerText = "DEFINITION";
        DOMStrings.origin.innerText = dictionary[0].date.split("{")[0];
        DOMStrings.originHead.innerText = "ORIGIN";
        DOMStrings.partOfSpeech.innerText = dictionary[0].fl;
        DOMStrings.partOfSpeechHead.innerText = "PART OF SPEECH";
        DOMStrings.pronunciation.innerText = dictionary[0].hwi.prs[0].mw;
        DOMStrings.pronunciationHead.innerText = "PRONUNCIATION";
        DOMStrings.synonymsHead.innerText = "SYNOYNMS";
        //printout all of the synonyms with spaces in between the commas, if any exist
        try {
          let synonymsPrintout = "";
          for (let i = 0; i < thesaurus[0].meta.syns.length; i++) {
            for (let j = 0; j < thesaurus[0].meta.syns[i].length; j++) {
              if (synonymsPrintout === "") {
                synonymsPrintout = thesaurus[0].meta.syns[i][j];
              } else {
                synonymsPrintout = `${synonymsPrintout}, ${thesaurus[0].meta.syns[i][j]}`;
              }
            }
          }
          DOMStrings.synonyms.innerText = synonymsPrintout;
        } catch (err) {
          console.log(err);
          DOMStrings.synonyms.innerText = "No synonyms found";
        }
      };

      displayWord();

      DOMStrings.inputWord.value = "";
    } catch (err) {
      DOMStrings.word.innerText = `ERROR: Not all required information could be found for word '${DOMStrings.inputWord.value}'.`;
      console.log(`[GetWordInfo] Error description: ${err}`);
      DOMStrings.inputWord.value = "";
    }
  });
}