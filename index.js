const prompt = require("readline-sync");
const wordBank = require("./word-bank.json");
let progress = 0;
let userInp = null;
let hangMan= null;
let word = null;
let wrChoices = "";
let gamesWon = 0;
let gamesLost = 0;
const formatInput = (getIndexZero) => {
  const firstLetter = getIndexZero.split("");
  return firstLetter[0];
};
const globalReset = () => {
  progress = 0;
  userInp = null;
  hangMan = null;
  word = null;
  wrChoices = "";
};
const wait = (time) =>{
  const rightNow = new Date();
  let future = null;
  do{future  =new Date();}
  while(future-rightNow < time);
};
const reset = (originalW, workingW)=>{
  if(originalW === workingW){
    return true;
  }
  else{
    return false;
   }
};
const aLetterOrNo = (userGuess) => {
  if (/[a-zA-Z]/.test(userGuess)) {
    return true;
  } else{
    console.log("This is NOT a letter, and you can only guess letters, please try again");
    return false;
  }
};
const getOutline = (lettCount, state ) => {
  let line1 = "-----";
  let line2 = "\n-   -\n";
  let line3 = "-   -\n";
  let line4 = "-\n";
  let line5 = "-\n";
  let line6 = "-\n";
  let line7 = "-\n";
  let line8 = "-\n";
  let line9 = "-\n";
  let line10 = "-----";
  switch(state){
    case 0:
      break;
    case 1: 
      line4 = "-   0\n";
      break;
    case 2:
      line4 = "-   0\n";
      line5 = "-   |\n";
      break;
    case 3:
      line4 = "-   0\n";
      line5 = "-  \\|\n";
      break;
    case 4:
      line4 = "-   0\n";
      line5 = "-  \\|/\n";
      break;
    case 5:
      line4 = "-   0\n";
      line5 = "-  \\|/\n";
      line6 = "-   |\n";
      break;
    case 6:
      line4 = "-   0\n";
      line5 = "-  \\|/\n";
      line6 = "-   |\n";
      line7 = "-  /\n";
      break;
    case 7:
      line4 = "-   0\n";
      line5 = "-  \\|/\n";
      line6 = "-   |\n";
      line7 = "-  / \\ \n";
      break;
  }
  return(line1 + line2 + line3 + line4 + line5 + line6 +line7 + line8 + line9 + line10);
};
const placeHolders = (wordArr) => {
  let hiddenWord = [];
  for(let i=0;i<wordArr.length;i++){
    hiddenWord.push("_");
  }
  return (hiddenWord.join(''));
};
const search = (arrToSearch,arrSearched1, letter)=>{ 
  let arrSearched = arrSearched1.split("");
  for(let i = 0;i < arrToSearch.length;i++){
    if(arrSearched[i] !=="_"){
      continue;
    }
    if(letter === arrToSearch[i]){
      arrSearched[i] = letter;
      console.log("Incorrect choices: " + wrChoices);
      return arrSearched.join("");
    }
  }
  progress++;
  wrChoices += letter + " ";
  console.log("Incorrect choices: " + wrChoices);

  return arrSearched.join("");
};
const getRandIndex = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
const losingMessage = (theWord, results) => { 
  gamesLost++;
  console.log("\n\n\n\n\n\n");
  wait(2000);
  console.log("Sorry you lost, please try again!");
  console.log("The word you were trying to guess was: " + theWord);
  wait(2000);
  console.log("The furthest you got was " + results + "and you lost " + gamesLost + " games so far.");
  console.log("On a more positive note, you have won " + gamesWon + " games so far");
  wait(2000);
  console.log("Loading");
  wait(1000);
  console.log(".");
  wait(1000);
  console.log(".");
  wait(1000);
  console.log(".");
  wait(1000);
  console.log("\n\n\n\n\n\n");
  globalReset();
};
const winningMessage = () => {
  gamesWon++;
  console.log("\n\n\n\n\n");
  console.log("You've won!\n\n Let's play again!\n\n");
  console.log("So far you've won " + gamesWon + " games, and you've lost " + gamesLost + ".");
  wait(2000);
  console.log("Loading");
  wait(1000);
  console.log(".");
  wait(1000);
  console.log(".");
  wait(1000);
  console.log(".");
  wait(1000);
  console.log("\n\n\n\n\n");
  globalReset();
};
console.log("\nWelcome to Hangman!\nPress ctrl + c to stop\n");
console.log("We'll pick a random word and you get \n 6 wrong guesses, at that point your character \n will have met his end.");
while (userInp != -1 ){
  const randIndex = getRandIndex(0,912);
  //console.log(randIndex);
  //console.log(wordBank[randIndex]);
  let currentWord = wordBank[randIndex];
  let currWordArr = currentWord.split("");
  console.log("Your word is chosen and it has " + currWordArr.length + " letters." );
  word = placeHolders(currWordArr);
  while(progress < 7){
    hangMan = getOutline(currWordArr.length, progress);
    console.log(hangMan);
    console.log(word);
    userInp = prompt.question("Please guess a letter: ");
    let testInput = aLetterOrNo(userInp);
    if (testInput === false){
      continue;
    }
    userInp = formatInput(userInp);
    word = search(currWordArr,word,userInp);
    let newGameTrigger = reset(currentWord, word);
    if(newGameTrigger === true){
      winningMessage(currentWord, word);
      break;
    }
    if(progress === 7){
      losingMessage(currentWord, word);
      break;
    }
  }
}