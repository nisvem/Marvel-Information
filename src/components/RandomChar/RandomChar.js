import React, { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../Spiner/Spiner';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);

    const marvelService = new MarvelService();

    const updateChar = () => {
        setLoading(true);

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        marvelService
        .getCharacter(id) 
        .then((res) => {
            setChar(res);
            setLoading(false);
        }).catch ( () => {
            updateChar();
        });
    }

    useEffect(() => {
        updateChar();
    }, []);

    return (
        <div className="randomchar">
            {loading?<Spiner/>:<View char={char}/>}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={() => updateChar()}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char, onCharSelected}) => {
    const {id, name, description, thumbnail, homepage, wiki} = char;

    let imgStyle = {'objectFit' : 'cover'};

    if (thumbnail.includes("image_not_available")) {
        imgStyle = {'objectFit' : 'unset'};
    }
    
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} target="_blank" rel="noreferrer" className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;