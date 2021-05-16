import React from 'react';
import './Search.scss';
import uuid from 'react-uuid';
import { apiUrl } from '../../databases';

export const Search = (props) => {
	const [matchMovies, setMatchMovies] = React.useState([]);
	const [queryWord, setQueryWord] = React.useState('');

	React.useEffect( () => queryWord.length>=3 && fetchResults(),[queryWord]);

	const fetchResults = () => {
		fetch(`${apiUrl}s=${queryWord}`)
		.then(data => data.json())
		.then(results => results.Search ? setMatchMovies(results.Search) : setMatchMovies([]));
	}
	
	const displayMovie = (movie) => {
		if(props.movieList.some(movieInList => movieInList.imdbID===movie.imdbID)) {
			return <li key={uuid()} className='clearfix'>{movie.Title}</li>
		} else {
			return <li key={uuid()} className='clearfix'>{movie.Title} <a onClick={() => props.toWatch(movie)}>+</a> </li>
		}
	}
	
	const showMatchingResults = () => matchMovies.length ? matchMovies.map(movie => displayMovie(movie)) : <div>X No matching results!</div>;

	const hideMatchingResults = () => document.documentElement.addEventListener('click', ()=>setQueryWord(''));

	return (
		<header className='main'>
			<div className='wrapper clearfix'>
				<h1>Movie<span>BUCKETLIST</span></h1>
				<div className='search'>
					<input type='text' placeholder='Search' value={queryWord} onChange={(e) => setQueryWord(e.target.value)}/>
					<ul>
						{queryWord.length>=3 && showMatchingResults()}
						{hideMatchingResults()}
					</ul>
				</div>
			</div>
		</header>
	
	)
}