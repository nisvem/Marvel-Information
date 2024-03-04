import { useState, useEffect, useRef } from 'react';
import RandomChar from '../RandomChar/RandomChar';
import CharList from '../CharList/CharList';
import CharInfo from '../CharInfo/CharInfo';
import CharSearchForm from '../CharSearchForm/CharSearchForm';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setsSelectedChar] = useState(null);
  const asideBlock = useRef(null);

  useEffect(() => {
    const asideBlockTop = asideBlock.current.getBoundingClientRect().top;

    function onScrollFixed() {
      if (asideBlockTop - 25 < window.scrollY) {
        asideBlock.current.style = `top: ${
          window.scrollY - asideBlockTop + 25
        }px`;
      } else {
        asideBlock.current.style = 'top: 0';
      }
    }

    window.addEventListener('scroll', onScrollFixed);

    return () => {
      window.removeEventListener('scroll', onScrollFixed);
    };
  }, []);

  return (
    <>
      <RandomChar />
      <div className='char__content'>
        <CharList onCharSelected={setsSelectedChar} />
        <aside ref={asideBlock}>
          <CharInfo charId={selectedChar} />
          <CharSearchForm></CharSearchForm>
        </aside>
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  );
};

export default MainPage;
