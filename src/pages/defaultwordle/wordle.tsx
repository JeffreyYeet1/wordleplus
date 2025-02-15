import React, { useEffect, useState } from "react";
import './wordle.css';
import Grid from './components/grid';
import Keyboard from "./components/keyboard";
import KeyboardListener from "../../keyboardlistener";
import End from "./components/end";
import validWords from "../../worddata/validwords.json";
import solutionWords from "../../worddata/solutionwords.json";
import Invalid from "./components/invalidword";

const DefaultWordle: React.FC = () => {
    const [solutionWord, setSolutionWord] = useState(solutionWords[Math.floor(Math.random() * solutionWords.length)].toUpperCase());
    const [isValidWord, setIsValidWord] = useState(false);
    const [resultArray, setResultArray] = useState<string[]>([]);
    const [keysPressed, setKeysPressed] = useState<string>('');
    const [number, setNumber] = useState(0);
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill('')); 
    const [gameWon, setGameWon] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [resultCode, setResultCode] = useState<string[]>(Array(6).fill(''));

    const checkWordValidity = (word: string) => {
        const isValid = validWords.includes(word.toLowerCase());
        setIsValidWord(isValid);
        return isValid;
    }

    setTimeout(() => {
        setIsValidWord(true);
      }, 500);

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
            else if (key.toUpperCase() === 'ENTER' && prev.length === 5 && checkWordValidity(prev)) { // Performs enter only when a full 5 letter word is present and is a valid word
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
                                if(checkGuess(prev, solutionWord) === "true"){
                                    setGameWon(true);
                                    currGuess[prevGuess] = "22222";
                                    return currGuess;
                                }
                                else {
                                    currGuess[prevGuess] = checkGuess(prev, solutionWord);
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
        setSolutionWord(solutionWords[Math.floor(Math.random() * solutionWords.length)].toUpperCase());
    }
    return(
        <>
            <div className="defaultwordlecontainer">
                <hr></hr>
                <End Win = {gameWon} Lose = {gameEnd} PlayAgain={playAgain} word={solutionWord}/>
                {(gameEnd || gameWon) ? null : <KeyboardListener onKeyPress={handleKeyPress}/>}
                <Grid word = {keysPressed} guessNumber={number} guesses = {guesses} resultCode = {resultCode}/>
                <Keyboard onKeyClick = {handleKeyPress} resultArray={resultArray}/>
                {isValidWord ? null : <Invalid />}
            </div>
        </>
    );
}

export default DefaultWordle;