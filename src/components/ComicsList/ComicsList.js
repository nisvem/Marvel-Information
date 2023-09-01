import React, { useEffect, useState } from 'react';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComicsPreview} = useMarvelService();

    const onRequest = (offset = comicsList.length, initial, limit = 8) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComicsPreview(offset, limit)
        .then((res) => {
            if(res.length < limit) setComicsEnded(true);

            setComicsList([...comicsList, ...res]);
            setNewItemLoading(false);
        })
    };

    useEffect(() => {
        onRequest(comicsList.length, true);
    }, []);

    useEffect(() => {
        const onScrollend = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && comicsList.length > 0) {
                onRequest(comicsList.length);
            }
        }

        window.addEventListener("scrollend", onScrollend);

        return () => {
            window.removeEventListener('scrollend', onScrollend);
        }
    }, [comicsList]);

    const renderItems = (arr) => {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};

            if (item.thumbnail.includes("image_not_available")) {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (
                <li 
                    className="comics__item"
                    key={i}
                    >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading  ? <Spiner/> : null;


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}

            {loading && !newItemLoading ? null : 
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading} 
                    style={{"display": comicsEnded ? "none" : "block"}}
                    onClick={() => {onRequest(comicsList.length)}}>
                    <div className="inner">load more</div>
                </button>
            }

        </div>
    )
}

export default ComicsList;