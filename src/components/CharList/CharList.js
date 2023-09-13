import { useEffect, useState } from 'react';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = ({onCharSelected}) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [charActive, setCharActive] = useState(false);

    const {loading, error, getAllCharactersPreview} = useMarvelService();

    const onRequest = (offset = charList.length, initial, limit = 9) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharactersPreview(offset, limit)
        .then((res) => {
            if(res.length < limit) setCharEnded(true);

            setCharList([...charList, ...res]);
            setNewItemLoading(false);
        })
    };

    useEffect(() => {
        onRequest(charList.length, true);
    }, []);

    useEffect(() => {
        const onScrollend = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && charList.length > 0) {
                onRequest(charList.length);
            }
        }

        window.addEventListener("scrollend", onScrollend);

        return () => {
            window.removeEventListener('scrollend', onScrollend);
        }
    }, [charList]);

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
    const spinner = loading && !newItemLoading  ? <Spiner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}

            {loading && !newItemLoading ? 
            null : 
            <button 
                className="button button__main button__long"
                disabled={newItemLoading} 
                style={{"display": charEnded ? "none" : "block"}}
                onClick={() => {onRequest(charList.length)}}>
                <div className="inner">load more</div>
            </button>}
        </div>
    )
}

export default CharList;