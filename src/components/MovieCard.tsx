import React from 'react'

import { Movie } from '../types/movie'

type MovieCardProps = Pick<Movie, 'id' | 'poster_path' | 'title' | 'release_date' | 'vote_average' | 'original_language'>;

const MovieCard = ({id, poster_path, title, release_date, vote_average, original_language}:MovieCardProps) => {
  return (
    <div className="movie-card">
    <img src={poster_path ?`https://image.tmdb.org/t/p/w500${poster_path}`: 'no-movie.png'} alt={title} />
    
    <div className="mt-4">
      <h3 >{title}</h3>
      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star icon" />
        </div>
      <p className='text-white'>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
      <span>•</span>
      <p className="lang">{original_language}</p>
      <span>•</span>
      <p className="year">
        {release_date ? release_date.split('-')[0] : 'N/A'}
      </p>
      </div>
    </div>
    </div>
   
  )
}

export default MovieCard