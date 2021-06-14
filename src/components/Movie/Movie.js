import React from 'react';
import './Movie.scss';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import trash from '../../images/trash.png';
import hide from '../../images/hide.png';

export const Movie = (props) => {
	const genres = props.movie.Genre.split(', ');

	return (
		<li className='movie clearfix'>
			<img className='poster' src={props.movie.Poster} alt={props.movie.Title}/>
			<span>{props.movie.imdbRating}</span>
			<Link to={`/${props.movie.id}`} onClick={()=>props.info(props.movie)}><h3>{props.movie.Title}</h3></Link>
			<ul className='clearfix'>{genres.map(genre => <li key={uuid()} className={`${props.movie.watched ? 'watched' : ''}`} onClick={()=>!props.movie.watched ? props.filterMovies(genre) : null}>{genre}</li>)}</ul>

			<div className='buttons'>
				{!props.movie.watched && <img src={hide} alt='watched' onClick={()=>props.hide(props.movie.id)}/>}
				<img src={trash} alt='remove' onClick={()=>props.remove(props.movie.id)}/>
				{!props.movie.watched && <span onClick={()=>props.move('down',props.movie)}>&#9660;</span>}
				{!props.movie.watched && <span onClick={()=>props.move('up',props.movie)}>&#9650;</span>}
			</div>
		</li>
	)
}