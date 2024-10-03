import React from "react";
import './end.css';

interface EndScreenProps {
    Win: boolean;
    Lose: boolean;
    PlayAgain: () => void;
    word: string;
}

const End: React.FC<EndScreenProps> = ({ Win, Lose, PlayAgain, word }) => {
    const handleClick = () => {
        PlayAgain();
    }
    return(
        <>
            <div className="endcontainer" style={{ display: (Win || Lose) ? 'flex' : 'none' }}
            >
                {Win && <div className="acontainer">
                    <p>Congratulations! You guessed the word!</p>
                    <p>Thanks for playing!</p>
                <button className="playagain" onClick={handleClick}>Play Again?</button>    
                </div>}
                {(Lose && !Win) && <div className="acontainer">
                    <p>The word was {word}</p>
                    <p>Thanks for playing!</p>
                <button className="playagain" onClick={handleClick}>Play Again?</button>    
                </div>}
            </div>
        </>
    );
}

export default End;
