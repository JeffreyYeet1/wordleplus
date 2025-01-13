import React, { useState } from "react";
import './wordle.css';
import Grid from './components/grid';
import Keyboard from "./components/keyboard";
import KeyboardListener from "../../keyboardlistener";
import End from "./components/end";

const DefaultWordle: React.FC = () => {
    const [resultArray, setResultArray] = useState<string[]>([]);
    const [keysPressed, setKeysPressed] = useState<string>('');
    const [number, setNumber] = useState(0);
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill('')); 
    const [gameWon, setGameWon] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [resultCode, setResultCode] = useState<string[]>(Array(6).fill(''));

    const randomWordSelect = (): string => {
        const wordBank: string[] = [
            "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
            "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE",
            "ALONG", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA", "ARGUE",
            "ARISE", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWARD", "AWARE", "BAKER",
            "BASIC", "BASIS", "BEACH", "BEGAN", "BEGIN", "BEGUN", "BEING", "BELOW", "BENCH", "BILLY",
            "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK", "BLOOD", "BOARD", "BOOST", "BOOTH", "BOUND",
            "BRAIN", "BRAND", "BREAD", "BREAK", "BREED", "BRIEF", "BRING", "BROAD", "BROKE", "BROWN",
            "BUILD", "BUILT", "BUYER", "CABLE", "CALIF", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR",
            "CHART", "CHASE", "CHEAP", "CHECK", "CHEST", "CHILD", "CHINA", "CHIEF", "CHOSE", "CIVIL",
            "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLICK", "CLOCK", "CLOSE", "COACH", "COAST", "COULD",
            "COUNT", "COURT", "COVER", "CRAFT", "CRASH", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN",
            "CURVE", "CYCLE", "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH",
            "DOING", "DOUBT", "DOZEN", "DRAFT", "DRAMA", "DRAWN", "DREAM", "DRESS", "DRILL", "DRINK",
            "DRIVE", "DROVE", "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY",
            "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA",
            "FAITH", "FALSE", "FAULT", "FIBRE", "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST",
            "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTY", "FORUM", "FOUND",
            "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT", "GIVEN",
            "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRASS", "GREAT", "GREEN", "GROSS",
            "GROUP", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY", "HARRY", "HEART", "HEAVY", "HENCE",
            "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE", "INDEX", "INNER", "INPUT", "ISSUE",
            "IRONY", "JUICE", "JOINT", "JUDGE", "KNOWN", "LABEL", "LARGE", "LASER", "LATER", "LAUGH",
            "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL", "LEVEL", "LIGHT", "LIMIT", "LOCAL",
            "LOGIC", "LOOSE", "LOWER", "LUCKY", "LUNCH", "LYING", "MAGIC", "MAJOR", "MAKER", "MARCH",
            "MATCH", "MAYOR", "MEANT", "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS", "MIXED", "MODEL",
            "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC", "NEEDS",
            "NEVER", "NEWLY", "NIGHT", "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCCUR", "OCEAN",
            "OFFER", "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER", "PARTY", "PEACE",
            "PHASE", "PHONE", "PHOTO", "PIECE", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT",
            "PLATE", "POINT", "POUND", "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR",
            "PRIZE", "PROOF", "PROUD", "PROVE", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE",
            "RAPID", "RATIO", "REACH", "READY", "REFER", "RIGHT", "RIVAL", "RIVER", "ROMAN", "ROUGH",
            "ROUND", "ROYAL", "RURAL", "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN",
            "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK",
            "SHOOT", "SHORT", "SHOWN", "SIGHT", "SINCE", "SIXTY", "SIZED", "SKILL", "SLEEP", "SLIDE",
            "SMALL", "SMART", "SMILE", "SMITH", "SMOKE", "SOLID", "SOLVE", "SORRY", "SOUND", "SOUTH",
            "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT", "STAFF",
            "STAGE", "STAKE", "STAND", "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK",
            "STONE", "STOOD", "STORE", "STORM", "STORY", "STRIP", "STUCK", "STUDY", "STUFF", "STYLE",
            "SUITE", "SUPER", "SWEET", "TABLE", "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "TEXAS",
            "THANK", "THEFT", "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD",
            "THREE", "THREW", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL",
            "TOUCH", "TOUGH", "TOWER", "TRACK", "TRADE", "TREAT", "TREND", "TRIAL", "TRIED", "TRIES",
            "TRULY", "TRUST", "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL", "UPPER",
            "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT", "VITAL",
            "VOICE", "WASTE", "WATCH", "WATER", "WHEEL", "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE",
            "WHOSE", "WOMAN", "WORRY", "WORSE", "WORST", "WOULD", "WRITE", "WRONG", "WROTE", "YIELD",
            "YOUNG", "YOUTH", "WORTH"
          ];
          
          // Word count: 646
        return wordBank[Math.floor(Math.random() * (wordBank.length - 0 + 1)) + 0];
    }

    const [givenWord, setGivenWord] = useState<string>(randomWordSelect);

    const countUniqueLetters = (word: string, letter: string) : number => {
        let count: number = 0;
        for (const x of word) {
            if (x === letter)
                count++;
        }
        return count;
    }

    const checkGuess = (guess: string, word:string): string => {
        let letterResult: string = '';
        let index: number = 0;
        let letterCount: {[key: string]: number} = {};
        if (guess === word)
            return "true";
        for (const letter of word)
            letterCount[letter] = countUniqueLetters(word, letter);
        for (const letter of guess) {
            if (word.includes(letter)){
                if (letterCount[letter]!==0){
                    if(letter === word[index]){
                        letterResult+="2";
                        letterCount[letter]--;
                    } else {
                        let remainingCount: number = letterCount[letter];
                        if (remainingCount!==0) {
                            for (let i = index; i<5; i++){
                                if(guess[i]===word[i] && word[i] === letter)
                                    remainingCount--;
                            }
                            if (remainingCount!==0){
                                letterResult+="1";
                                letterCount[letter]--;
                            } else 
                                letterResult+="0";
                        } else 
                            letterResult+="0";
                    }
                } else
                    letterResult+="0";
            } else 
                letterResult+="0";
            index++;
        }
        return letterResult;
    }

    const handleKeyPress = (key: string) => {
        setKeysPressed((prev) => { // Deals with all key presses
            if (key === 'Backspace' || key === 'BACK')
                return prev.slice(0,-1);
            else if (key.toUpperCase() === 'ENTER' && prev.length === 5) { // Performs enter only when a full 5 letter word is present
                setNumber((prevGuess) => { // Add a number to move to the next row
                    setGuesses(guesses => { // Add the guess to the list of guesses
                        if (prevGuess < guesses.length) // Makes sure it doesnt append more than 6 guesses
                            guesses[prevGuess] = prev;
                        return guesses;
                    });
                        if(prevGuess < 6) {// Makes sure it doesn't go over row 6
                            setResultCode((currGuess) => {
                                for(let i = 0; i< guesses.length; i++){
                                    for(let l = 0; l<guesses[i].length; l++){
                                        setResultArray((prevArray)=>{
                                            let sub = guesses[i][l] + currGuess[i][l];
                                            console.log(prevArray);
                                            if(prevArray.includes(sub))
                                                return prevArray;
                                            else 
                                                return [...prevArray, sub];
                                        });
                                    };
                                };
                                if(checkGuess(prev, givenWord) === "true"){
                                    setGameWon(true);
                                    currGuess[prevGuess] = "22222";
                                    return currGuess;
                                }
                                else {
                                    currGuess[prevGuess] = checkGuess(prev, givenWord);
                                    return currGuess;
                                }   
                            })
                            if(prevGuess>4)
                                setGameEnd(true);
                            return prevGuess + 1;
                        }
                        return prevGuess;
                    }
                );
                return ''; // Clears the existing word
            }
            else { 
                if (prev.length < 5 && key.length === 1){ // Checks if theres room for more letters
                    return prev+key.toUpperCase();
                }
                else {
                    return prev; // Returns current word if max length reached
                }
            }
        });
    };

    const playAgain = (): void => {
        setGameEnd(false);
        setGameWon(false);
        setGuesses(Array(6).fill(''));
        setNumber(0);
        setResultCode(Array(6).fill(''));
        setKeysPressed('');
        setResultArray([]);
        setGivenWord(randomWordSelect);
    }

    return(
        <>
            <div className="defaultwordlecontainer">
                <div className="topbar">Wordle Classic</div>
                <End Win = {gameWon} Lose = {gameEnd} PlayAgain={playAgain} word={givenWord}/>
                {(gameEnd || gameWon) ? null : <KeyboardListener onKeyPress={handleKeyPress}/>}
                <Grid word = {keysPressed} guessNumber={number} guesses = {guesses} resultCode = {resultCode}/>
                <Keyboard onKeyClick = {handleKeyPress} resultArray={resultArray}/>
            </div>
        </>
    );
}

export default DefaultWordle;