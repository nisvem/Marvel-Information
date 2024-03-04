import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../Skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);


    const updateChar = () => {
        if(!charId) return;

        getCharacter(charId)
        .then((res) => {
            setChar(res);
        });
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spiner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
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

                        const idComicURL = item.resourceURI.split("/");
                        const idComic = idComicURL[idComicURL.length - 1];

                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${idComic}`}>{item.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    );
}

export default CharInfo;