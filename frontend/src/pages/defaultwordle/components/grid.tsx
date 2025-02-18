import React, { useState } from "react";
import './grid.css';
import Row from "./row";

interface GridProps {
    word: string;
    guessNumber: number;
    guesses: string[];
    resultCode: string[];
}

const Grid: React.FC<GridProps> = ({word, guessNumber, guesses, resultCode}) => {
    const rows: number[] = [0,1,2,3,4,5];

    return(
        <>
            <div className="gridcontainer">
                {rows.map((num) => (<Row word = {guessNumber === num ? word : guesses[num]} resultCode = {resultCode[num]}/>))}
            </div>
        </>
    );
}

export default Grid;