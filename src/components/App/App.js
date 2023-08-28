import React, { useState } from 'react';
import AppHeader from "../AppHeader/AppHeader";
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const App = () => {
    const [selectedChar, setsSelectedChar] = useState(null);

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={setsSelectedChar}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;