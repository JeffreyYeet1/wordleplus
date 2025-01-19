import React, { useRef, useState } from "react";
import './row.css';

interface RowProps {
    word: string;
    resultCode: string;
}

const Row: React.FC<RowProps> = ({word, resultCode}) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [boxSize, setBoxSize] = useState<number>(100)
    const styles = [
        { backgroundColor: 'rgb(57,57,60)' , outline: '2px solid rgb(57,57,60)'},
        { backgroundColor: 'rgb(181,159,59)', outline: '2px solid rgb(181,159,59)'},
        { backgroundColor: 'rgb(83,141,78)', outline: '2px solid rgb(83,141,78)'}
    ]

    const changeSize = () => {
        if(boxRef.current) {
            const currentSize = boxRef.current.getBoundingClientRect().height;

            const newSize = currentSize * 1.1;
            setBoxSize(newSize);
        }
    }
    const numberArray: number[] = resultCode.split('').map(Number);
    const boxes: number[] = [0,1,2,3,4];

    return(
        <div className="rowcontainer">
            {boxes.map((num) => (<div ref = {boxRef} style = {height: boxSize , resultCode === '' && word[num] ? {outline: "2px solid rgb(86,87,88)"} : {...styles[numberArray[num]]}}>{word[num]}</div>))}
        </div>
    );
}

export default Row;