import React, { useState } from "react";
import './keyboard.css';

interface KeyboardProps {
    onKeyClick: (key: string) => void;
    resultArray: string[];
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyClick, resultArray }) => {
    const rowonekeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const rowtwokeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const rowthreekeys = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'];
    const styles = [
        {backgroundColor: 'rgb(58,58,60)'}, //Greyed out
        {backgroundColor: 'rgb(181,159,59)'}, //Yellow
        {backgroundColor: 'rgb(83,141,78)'} //Green
    ];
    const handleMouseClick = (letter: string) => {
        onKeyClick(letter);
    };

    return (
        <div className="keyboardcontainer">
            <div className="linecontainer">
                {rowonekeys.map((key) => (
                    <div key={key} onClick={() => handleMouseClick(key)} style = {{backgroundColor: resultArray.includes(key+'2') ? 'rgb(83,141,78)' : resultArray.includes(key+'1') ? 'rgb(181,159,59)' : resultArray.includes(key+'0') ? 'rgb(58,58,60)' : 'rgb(129,131,132)'}}>
                        {key}
                    </div>
                ))}
            </div>
            <div className="linecontainer1">
                {rowtwokeys.map((key) => (
                <div key={key} onClick={() => handleMouseClick(key)} style = {{backgroundColor: resultArray.includes(key+'2') ? 'rgb(83,141,78)' : resultArray.includes(key+'1') ? 'rgb(181,159,59)' : resultArray.includes(key+'0') ? 'rgb(58,58,60)' : 'rgb(129,131,132)'}}>
                    {key}
                </div>
                ))}
            </div>
            <div className="linecontainer">
                {rowthreekeys.map((key) => (
                    <div key={key} style =  {{width: key === 'ENTER' ? '80px' : key === 'BACK' ? '90px' : '100%', backgroundColor: resultArray.includes(key+'2') ? 'rgb(83,141,78)' : resultArray.includes(key+'1') ? 'rgb(181,159,59)' : resultArray.includes(key+'0') ? 'rgb(58,58,60)' : 'rgb(129,131,132)'}} onClick={() => handleMouseClick(key)}>
                        {key}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Keyboard;
