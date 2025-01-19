import React from "react";
import './row.css';

interface RowProps {
    word: string;
    resultCode: string;
}

const Row: React.FC<RowProps> = ({word, resultCode}) => {
    const styles = [
        { backgroundColor: 'rgb(18,18,19)' },
        { backgroundColor: 'rgb(181,159,59)', outline: '2px solid rgb(181,159,59)'},
        { backgroundColor: 'rgb(83,141,78)', outline: '2px solid rgb(83,141,78)'}
    ]

    const numberArray: number[] = resultCode.split('').map(Number);
    const boxes: number[] = [0,1,2,3,4];

    return(
        <>
            <div className="rowcontainer">
                {boxes.map((num) => (<div style ={{...styles[numberArray[num]]}}>{word[num]}</div>))}
            </div>
        </>
    );
}

export default Row;