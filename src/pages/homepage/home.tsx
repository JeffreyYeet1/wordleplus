import React from "react";
import './home.css';
import Wordle from '../defaultwordle/wordle'

const Home: React.FC = () => {
    return(
        <>
            <div className="homecontainer">
                <h1>Wordle Plus!</h1>
                <a href ='../defaultwordle/wordle.tsx'><button>Go to wordle</button></a>
            </div>
        </>
    );
}

export default Home;