import { useState } from 'react';
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setsSelectedChar] = useState(null);

  return (
    <>
      <RandomChar/>
      <div className="char__content">
          <CharList onCharSelected={setsSelectedChar}/>
          <CharInfo charId={selectedChar}/>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision"/>
    </>
  );
};

export default MainPage;