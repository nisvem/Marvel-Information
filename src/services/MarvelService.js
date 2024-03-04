import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, clearError, error} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = `apikey=${process.env.REACT_APP_TOKEN_MARVEL}`;
  const _baseLimit = 9;
  const _baseOffset = 0;

  const getAllCharacters = async () => {
    const res = await request(`${_apiBase}characters?${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }

  const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

  const getAllCharactersPreview = async (offset = _baseOffset, limit = _baseLimit) => {
    const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }

  const getAllComicsPreview = async (offset = _baseOffset, limit = _baseLimit) => {
    const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}&orderBy=title&noVariants=true`);
    return res.data.results.map(_transformComic)
  }

  const getCharacter = async (id) => {
    const char = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(char.data.results[0]);
  }

  const getComic = async (id) => {
    const char = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(char.data.results[0]);
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is no description',
      pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      language: comic.textObjects.language || 'en-us',
      price: comic.prices[0].price ? `${comic.prices[0].price}$`: 'not avalible' 
    }
  }

  return {loading, error, clearError, getAllCharacters, getCharacterByName, getAllCharactersPreview, getCharacter, getAllComicsPreview, getComic}
}

export default useMarvelService;