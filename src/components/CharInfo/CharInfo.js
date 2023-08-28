import React, { useEffect, useState, useRef } from 'react';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../Skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const charInfoBlock = useRef(null);


    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();

        const charInfoTop = charInfoBlock.current.getBoundingClientRect().top;

        function onScrollFixed () {
            if ((charInfoTop - 25) < window.scrollY) {
                charInfoBlock.current.style = `top: ${window.scrollY - charInfoTop + 25}px`;
            } else {
                charInfoBlock.current.style = 'top: 0';
            }
        }

        window.addEventListener("scroll", onScrollFixed);

        return () => {
            window.removeEventListener('scroll', onScrollFixed);
        }
    }, []);


    useEffect(() => {
        updateChar();
    }, [charId]);


    const updateChar = () => {
        if(!charId) return;

        setLoading(true);

        marvelService
        .getCharacter(charId)
        .then((res) => {
            setChar(res);
            setLoading(false);
        }).catch ( () => {
            setLoading(false);
            setError(true);
        });
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spiner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info" ref={charInfoBlock}>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};

    if (thumbnail.includes("image_not_available")) {
        imgStyle = {'objectFit' : 'unset'};
    }


    return (
        <React.Fragment>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : "There is no comics with this character"}
                {
                    comics.map((item, i) => {
                        if(i > 9) return false;

                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    );
}

export default CharInfo;