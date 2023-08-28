import React, { useEffect, useRef, useState } from 'react';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

const CharList = ({onCharSelected}) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [error, setError] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [charActive, setCharActive] = useState(false);

    const charItem = useRef(null);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);


    useEffect(() => {
        function onScrollend () {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                onRequest(charList.length);
            }
        }

        window.addEventListener("scroll", onScrollend);
        return () => {
            window.removeEventListener('scroll', onScrollend);
        }

    }, [charList]);

    const onRequest = (offset = charList.length, limit = 9) => {
        onCharListLoading();
        marvelService
        .getAllCharactersPreview(offset, limit)
        .then((res) => {
            if(res.length < limit) setCharEnded(true);
            setCharList([...charList, ...res]);
            setLoading(false);
            setNewItemLoading(false);
        }).catch ( () => {
            setLoading(false);
            setError(true);
            setNewItemLoading(false);
        });
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const renderItems = (arr) => {
        const items =  arr.map((item) => {

            let imgStyle = {'objectFit' : 'cover'};

            if (item.thumbnail.includes("image_not_available")) {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li 
                    className={"char__item " + (charActive === item.id ? "char__item_selected" : "")}
                    key={item.id}
                    onClick={() => {
                        onCharSelected(item.id);
                        setCharActive(item.id);
                    }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spiner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}

            <button 
                className="button button__main button__long"
                disabled={newItemLoading} 
                style={{"display": charEnded ? "none" : "block"}}
                onClick={() => {onRequest(charList.length)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}




export default CharList;