import React from 'react';
import './Movies.scss';
import uuid from 'react-uuid';
import { Movie } from '../Movie/Movie';
import filter from '../../images/filter.png';

export const Movies = (props) => {

	const showMovies = (movieList) => {
		return movieList.length ? movieList.map(movie => <Movie key={uuid()} movie={movie} hide={props.hide} remove={props.remove} move={props.move} filterMovies={props.filterMovies} info={props.info}/>) : <li>The list is empty!</li>
	}

	const showFilters = () => (
		<div className='filters clearfix'>
			<div>{props.filters.map(genre=><span key={uuid()}>{genre}</span>)}</div>
			<img src={filter} alt='reset' onClick={props.reset}/>
		</div>
	)

	return (
		<section className='movies wrapper'>
			{!props.watched && showFilters()}
			<h2>{!props.watched ? 'TO WATCH' : 'WATCHED'}</h2>
			<ul>
				{showMovies(props.movieList)}
			</ul>
		</section>
	)
}