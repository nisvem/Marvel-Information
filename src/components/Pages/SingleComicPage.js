import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Spiner from '../Spiner/Spiner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './SingleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
      getComic(comicId)
        .then((res) => {
          setComic(res);
        });
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spiner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}


const View = ({comic}) => {
  const {title, description, thumbnail, language, price} = comic;

  return (
      <React.Fragment>
          <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all comics</Link>
      </React.Fragment>
  );
}

export default SingleComicPage;