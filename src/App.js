import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { firebaseUrl } from './databases';
import { apiUrl }  from './databases';
import { Search } from './components/Search/Search';
import { Movies } from './components/Movies/Movies';
import { MovieInfo } from './components/MovieInfo/MovieInfo';

const App = () => {
  const [movieList, setMovieList] = React.useState([]);
  const [moviesForWatch, setMoviesForWatch] = React.useState([]);
  const [watchedMovies, setWatchedMovies] = React.useState([]);
  const [filters, setFilters] = React.useState([]);
  const [movieInfo, setMovieInfo] = React.useState(null);

  const toWatch = (movie) => {
    fetch(`${apiUrl}i=${movie.imdbID}`)
    .then(data => data.json())
    .then(result => {
      fetch(`${firebaseUrl}.json`, {
        method:'POST',
        body:JSON.stringify({...result, watched:false, imdbID:movie.imdbID})
      })
      .then(data => data.status === 200 ? getResults() : alert('Something got wrong...'))
    })
  }

  const getResults = () => {
    fetch(`${firebaseUrl}.json`)
    .then(data => data.json())
    .then(results => {
      const movies = [];
        for(const result in results) {
          movies.unshift({...results[result], id:result})
        }
      const moviesForWatch = movies.filter(movie => !movie.watched);
      const watchedMovies = movies.filter(movie => movie.watched);
      setMoviesForWatch(moviesForWatch);
      setWatchedMovies(watchedMovies);
      setMovieList(movies);
      setFilters([]);
    })
  }

  const hide = (id) => {
    const movie = moviesForWatch.find(movie => movie.id===id);
    movie.watched = true;
    fetch(`${firebaseUrl}${id}.json`, {
      method:'PATCH',
      body:JSON.stringify(movie)
    })
    .then(data => data.status === 200 ? getResults() : alert('Something got wrong...'))
  }

  const remove = (id) => {
    const movie = movieList.find(movie => movie.id===id);
    fetch(`${firebaseUrl}${id}.json`, {
      method:'DELETE',
      body:JSON.stringify(movie)
    })
    .then(data => data.status === 200 ? getResults() : alert('Something got wrong...'))
  }

  const move = (position, movie) => {
    const indexOfMovie = moviesForWatch.indexOf(movie);
    const movies = [...moviesForWatch];
    if(position==='up' && indexOfMovie!==0) {
      movies.splice(indexOfMovie,1);
      movies.splice(indexOfMovie - 1, 0, movie);
    } else if (position==='down' && indexOfMovie!==moviesForWatch.length-1) {
      movies.splice(indexOfMovie,1);
      movies.splice(indexOfMovie + 1, 0, movie);
    }
    setMoviesForWatch(movies);
  }

  const filterMovies = (genre) => {
    const filteredMovies = moviesForWatch.filter(movie => movie.Genre.includes(genre))
    setMoviesForWatch([...filteredMovies]);
    if (!filters.includes(genre)) {
      setFilters([...filters, genre])
    }
  }

  const info = (movie) => setMovieInfo({...movie});
 
  React.useEffect(getResults,[]);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/:id'>
          {movieInfo!==null && <MovieInfo movie={movieInfo}/>}
        </Route>
        <Route exact path='/'>
          <Search toWatch={toWatch} movieList={movieList}/>
          <Movies watched={false} movieList={moviesForWatch} hide={hide} remove={remove} move={move} filterMovies={filterMovies} filters={filters} reset={()=>getResults()} info={info}/>
          <Movies watched={true} movieList={watchedMovies} hide={hide} remove={remove} move={move} filterMovies={filterMovies} filters={filters} reset={()=>getResults()} info={info}/>
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App;