import React from 'react'
import { Movie } from '../types/movie'
import MovieCard from './MovieCard'

type MovieListProps = {
    movieList: Movie[]
}

const MovieList = ({movieList}: MovieListProps) => {
  return (
    <ul className="movie-list">
    {movieList.map((movie) => (
      <li key={movie.id} className="movie-item">
     <MovieCard
      key={movie.id}
      id={movie.id}
      poster_path={movie.poster_path}
      title={movie.title}
      release_date={movie.release_date}
      original_language={movie.original_language}
      vote_average={movie.vote_average}

      />
      </li>
      ))}
  </ul>
  )
}

export default MovieList