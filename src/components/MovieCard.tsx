import React from 'react'

import { Movie } from '../types/movie'

type MovieCardProps = Pick<Movie, 'id' | 'poster_path' | 'title' | 'release_date'>;
// type MovieCardProps = {
//   id: number;
//   poster_path: string;
//   title: string;
//   release_date: string;
// }

const MovieCard = ({id, poster_path, title, release_date}:MovieCardProps) => {
  return (
    <li key={id} className="movie-item">
    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
    <h3 className="text-white">{title}</h3>
    <p className="text-gray-400">{release_date}</p>
  </li>
  )
}

export default MovieCard