import React from 'react';
import './MovieInfo.scss';
import { Link } from 'react-router-dom';

export const MovieInfo = (props) => {

	return (
		<React.Fragment>
			<header className='info'>
				<div className='wrapper  clearfix'>
					<Link to='/project-movie-bucketlist' className='clearfix'> <span className='back'>&lt;</span> </Link>
					<h1><span>{!props.movie.watched ? 'To Watch ' : 'Watched '}</span>/ {props.movie.Title}</h1>
				</div>
			</header>
			<article className='wrapper clearfix'>
				<div>
					<img src={props.movie.Poster} alt='movie-poster'/>
				</div>
				<div>
					<h1>{props.movie.Title}</h1>
					<span className='rating'>{props.movie.imdbRating}</span>
					<div>
						<p>Release Date: <span>{props.movie.Released}</span></p>
						<p>Runtime: <span>{props.movie.Runtime}</span></p>
						<p>Genre: <span>{props.movie.Genre}</span></p>
						<p>Director: <span>{props.movie.Director}</span></p>
						<p>Actors: <span>{props.movie.Actors}</span></p>
						<p>Plot: <span>{props.movie.Plot}</span></p>
					</div>
				</div>
			</article>
		</React.Fragment>
	)
}