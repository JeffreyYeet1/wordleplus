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
    // State variables
    const [solutionWord, setSolutionWord] = useState(solutionWords[Math.floor(Math.random() * solutionWords.length)].toUpperCase()); // Randomly selects a solution word
    const [isValidWord, setIsValidWord] = useState(true); // Tracks whether a guessed word is valid
    const [resultArray, setResultArray] = useState<string[]>([]); // Stores letter results for keyboard feedback
    const [keysPressed, setKeysPressed] = useState<string>(''); // Stores the current word being typed
    const [number, setNumber] = useState(0); // Tracks the current row of guesses
    const [guesses, setGuesses] = useState<string[]>(Array(6).fill('')); // Stores previous guesses
    const [gameWon, setGameWon] = useState(false); // Tracks if the game is won
    const [gameEnd, setGameEnd] = useState(false); // Tracks if the game has ended
    const [resultCode, setResultCode] = useState<string[]>(Array(6).fill('')); // Stores feedback codes for guesses
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for side menu

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // Function to check if a word is valid
    const checkWordValidity = (word: string) => {
        const isValid = validWords.includes(word.toLowerCase());
        setIsValidWord(isValid);
        return isValid;
    }

    // Temporary fix to reset invalid word message after 500ms
    setTimeout(() => {
        setIsValidWord(true);
      }, 500);

    // Function to count occurrences of a letter in a word
    const countUniqueLetters = (word: string, letter: string) : number => {
        let count: number = 0;
        for (const x of word) {
            if (x === letter)
                count++;
        }
        return count;
    }

    // Function to check a guess against the solution word
    const checkGuess = (guess: string, word:string): string => {
        let letterResult: string = '';
        let index: number = 0;
        let letterCount: {[key: string]: number} = {};
        
        if (guess === word)
            return "true"; // If guess is correct, return "true"
        
        // Count occurrences of each letter in the solution word
        for (const letter of word)
            letterCount[letter] = countUniqueLetters(word, letter);
        
        for (const letter of guess) {
            if (word.includes(letter)){
                if (letterCount[letter]!==0){
                    if(letter === word[index]){
                        letterResult+="2"; // Correct letter in correct position
                        letterCount[letter]--;
                    } else {
                        let remainingCount: number = letterCount[letter];
                        if (remainingCount!==0) {
                            for (let i = index; i<5; i++){
                                if(guess[i]===word[i] && word[i] === letter)
                                    remainingCount--;
                            }
                            if (remainingCount!==0){
                                letterResult+="1"; // Correct letter in wrong position
                                letterCount[letter]--;
                            } else 
                                letterResult+="0"; // Incorrect letter
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

    // Function to handle key presses
    const handleKeyPress = (key: string) => {
        setKeysPressed((prev) => {
          if (key === 'Backspace' || key === 'BACK') {
            return prev.slice(0, -1); // Handle backspace
          } else if (key.toUpperCase() === 'ENTER' && prev.length === 5 && checkWordValidity(prev)) {
            // Handle Enter key
            setNumber((prevGuess) => {
              if (prevGuess >= 6) return prevGuess; // Don't go beyond row 6
      
              // Update guesses
              setGuesses((guesses) => {
                const newGuesses = [...guesses];
                if (prevGuess < newGuesses.length) {
                  newGuesses[prevGuess] = prev;
                }
                return newGuesses;
              });
      
              // Check the guess and update resultCode
              const guessResult = checkGuess(prev, solutionWord);
              setResultCode((currGuess) => {
                const newResultCode = [...currGuess];
                if (guessResult === "true") {
                  setGameWon(true);
                  newResultCode[prevGuess] = "22222"; // Marks all letters as correct
                } else {
                  newResultCode[prevGuess] = guessResult;
                }
                return newResultCode;
              });
      
              // Update resultArray for keyboard feedback
              setResultArray((prevArray) => {
                const newResultArray = [...prevArray];
                for (let i = 0; i < prev.length; i++) {
                  const sub = prev[i] + guessResult[i];
                  if (!newResultArray.includes(sub)) {
                    newResultArray.push(sub);
                  }
                }
                return newResultArray;
              });
      
              // End game if this is the last guess
              if (prevGuess > 4) {
                setGameEnd(true);
              }
      
              return prevGuess + 1; // Move to the next row
            });
      
            return ''; // Clear the current word
          } else {
            // Handle letter keys
            if (prev.length < 5 && key.length === 1) {
              return prev + key.toUpperCase();
            }
            return prev; // Return current word if max length reached
          }
        });
      };

    // Function to reset the game
    const playAgain = (): void => {
        setGameEnd(false);
        setGameWon(false);
        setGuesses(Array(6).fill(''));
        setNumber(0);
        setResultCode(Array(6).fill(''));
        setKeysPressed('');
        setResultArray([]);
        setSolutionWord(solutionWords[Math.floor(Math.random() * solutionWords.length)].toUpperCase()); // Selects a new word
    }
    
    return(
        <>
            <div className="defaultwordlecontainer">
                {/* Top Bar */}
                <div className="top-bar">
                    <button className="hamburger-button" onClick={toggleMenu}>
                        ☰
                    </button>
                    <div className="defaultwordle-title">Wordle</div>
                </div>

                {/* Side Menu */}
                {isMenuOpen && (
                    <div className="side-menu">
                        <div className="menu-content">
                            <p>Menu Item 1</p>
                            <p>Menu Item 2</p>
                            <p>Menu Item 3</p>
                        </div>
                    </div>
                )}

                {/* Dimmed Background */}
                {isMenuOpen && <div className="dimmed-background" onClick={toggleMenu} />}
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
